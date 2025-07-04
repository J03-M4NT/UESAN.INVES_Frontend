<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="custom-header">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> Vicerrectorado de Investigación </q-toolbar-title>
        <q-btn
          flat
          dense
          round
          :icon="isDark ? 'dark_mode' : 'light_mode'"
          aria-label="Cambiar modo"
          @click="toggleDarkMode"
          class="q-mr-sm"
        />
        <q-btn
          flat
          dense
          round
          icon="account_circle"
          aria-label="Cuenta"
          @click="toggleRightDrawer"
        />
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="custom-drawer">
      <q-list class="drawer-list">
        <q-item-label header class="drawer-header"> Opciones: </q-item-label>
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
          class="drawer-link"
        />
        <!-- Solo mostrar el panel de control y propuestas si el usuario es admin -->
        <q-item
          v-if="user && Number(user.rolId) === 4"
          clickable
          to="/admin/dashboard"
          class="drawer-link"
        >
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            <span>Panel de Control</span>
          </q-item-section>
        </q-item>
        <q-item
          v-if="user && Number(user.rolId) === 4"
          clickable
          to="/admin/propuestas"
          class="drawer-link"
        >
          <q-item-section avatar>
            <q-icon name="assignment" />
          </q-item-section>
          <q-item-section>
            <span>Propuestas</span>
          </q-item-section>
        </q-item>
        <!-- Eliminado: Filtrar por roles para admins -->
        <!-- Espaciador para empujar el botón hacia abajo -->
        <q-space />
        <!-- Botón de cerrar sesión al pie -->
        <q-item clickable @click="logout" class="drawer-link q-mt-xl">
          <q-item-section avatar>
            <q-icon name="logout" color="negative" />
          </q-item-section>
          <q-item-section>
            <span class="text-negative">Cerrar Sesión</span>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Drawer lateral derecho para usuario -->
    <q-drawer v-model="rightDrawerOpen" side="right" bordered class="custom-drawer" width="260">
      <q-list class="drawer-list">
        <q-item-label header class="drawer-header"> Bienvenido/a </q-item-label>
        <q-item>
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>
          <q-item-section>
            <div>
              <b>{{ user?.nombre || 'Usuario' }}</b>
            </div>
            <div class="text-caption">{{ user?.email }}</div>
            <div class="text-caption q-mt-xs">{{ getRoleName(user?.rolId) }}</div>
          </q-item-section>
        </q-item>
        <q-separator spaced />
        <!-- Opciones según el rol -->
        <template v-if="user && Number(user.rolId) === 4">
          <q-item clickable @click="showPerfilModal = true" class="drawer-link">
            <q-item-section avatar>
              <q-icon name="manage_accounts" />
            </q-item-section>
            <q-item-section>Perfil Admin</q-item-section>
          </q-item>
          <q-item clickable to="/admin/usuarios" class="drawer-link">
            <q-item-section avatar>
              <q-icon name="group" />
            </q-item-section>
            <q-item-section>Gestión de Usuarios</q-item-section>
          </q-item>
        </template>
        <template v-else-if="user && [1, 2, 3].includes(Number(user.rolId))">
          <q-item clickable @click="showPerfilModal = true" class="drawer-link">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>Mi Perfil</q-item-section>
          </q-item>
          <!-- Solo mostrar Enviar Propuestas a profesores, ocultar para otros roles -->
          <q-item
            v-if="Number(user.rolId) === 2"
            :clickable="
              user.estado === true || String(user.estado).trim().toLowerCase() === 'activo'
            "
            :to="
              user.estado === true || String(user.estado).trim().toLowerCase() === 'activo'
                ? '/mis-articulos'
                : undefined
            "
            class="drawer-link"
            :class="{
              'text-grey-5': !(
                user.estado === true || String(user.estado).trim().toLowerCase() === 'activo'
              ),
            }"
            :style="
              !(user.estado === true || String(user.estado).trim().toLowerCase() === 'activo')
                ? { pointerEvents: 'none', opacity: 0.6 }
                : {}
            "
          >
            <q-item-section avatar>
              <q-icon name="article" />
            </q-item-section>
            <q-item-section>Enviar Propuestas</q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-drawer>

    <PerfilModal :show="showPerfilModal" @close="showPerfilModal = false" />
    <q-page-container>
      <router-view />
    </q-page-container>

    <ChatBot />
  </q-layout>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import PerfilModal from 'components/auth/PerfilModal.vue'
import { useRouter } from 'vue-router'
import EssentialLink from 'components/EssentialLink.vue'
import ChatBot from 'src/components/auth/ChatBot.vue'
import { useQuasar } from 'quasar'

const router = useRouter()
const user = ref(JSON.parse(localStorage.getItem('user')) || {})
const showPerfilModal = ref(false)
const $q = useQuasar()
const isDark = ref($q.dark.isActive)

window.addEventListener('storage', () => {
  user.value = JSON.parse(localStorage.getItem('user')) || {}
})

watchEffect(() => {
  // Mostrar el objeto user y el estado exacto
  console.log('Usuario actual:', user.value)
  if (user.value) {
    console.log('Estado (raw):', user.value.estado)
    console.log('Estado (normalizado):', String(user.value.estado).trim().toLowerCase())
    console.log('RolId:', user.value.rolId)
  }
})

const linksList = computed(() => [
  { title: 'Inicio', caption: '', icon: 'home', link: '/' },
  { title: 'Revistas', caption: '', icon: 'menu_book', link: '/revistas' },
  // { title: 'Artículos', caption: '', icon: 'description', link: '/articulos' }, // Eliminado
  { title: 'Noticias', caption: '', icon: 'newspaper', link: '/noticias' },
  { title: 'Guardados', caption: '', icon: 'label', link: '/guardados' },
])

const leftDrawerOpen = ref(false)
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const rightDrawerOpen = ref(false)
function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

// Función para cerrar sesión
function logout() {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  router.push('/login')
}

function getRoleName(rolId) {
  switch (Number(rolId)) {
    case 1:
      return 'Estudiante'
    case 2:
      return 'Profesor'
    case 3:
      return 'Personal externo'
    case 4:
      return 'Administrador'
    default:
      return ''
  }
}

const propuestasCount = ref(0)

// Simulación: fetch de propuestas para el admin (reemplazar por API real)
function fetchPropuestasCount() {
  // Aquí deberías hacer una petición real al backend para obtener el número de propuestas
  // Por ahora, simula con un número fijo
  propuestasCount.value = 3 // <-- Cambia esto por la respuesta real
}

if (user.value && Number(user.value.rolId) === 4) {
  fetchPropuestasCount()
}

function toggleDarkMode() {
  $q.dark.set(!$q.dark.isActive)
  isDark.value = $q.dark.isActive
}
</script>

<style scoped>
:root {
  --main-bg: #fff;
  --main-text: #222;
}
body.body--dark,
.q-dark {
  --main-bg: #181818;
  --main-text: #fff;
}
.q-page-container,
.q-page,
.dashboard-container,
.import-container {
  background: var(--main-bg) !important;
  color: var(--main-text) !important;
}
.custom-header {
  background: #d32f2f !important;
  color: #fff;
}
.custom-drawer {
  background: #d32f2f !important;
  color: #fff;
}
.drawer-header {
  color: #e25050;
  font-weight: 600;
  font-size: 1.1rem;
}
.drawer-link {
  color: #e25050 !important;
}
.q-item {
  color: #e25050 !important;
}
.q-item--active,
.q-item.q-router-link--active {
  background: rgba(255, 255, 255, 0.12) !important;
  color: #e25050 !important;
}
.q-item__label,
.q-item__section {
  color: #e25050 !important;
}
/* Para que el drawer ocupe toda la altura y el botón quede abajo */
.drawer-list {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
