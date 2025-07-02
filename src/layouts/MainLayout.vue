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
        <!-- Solo mostrar el panel de control si el usuario es admin -->
        <q-item
          v-if="user && Number(user.rolId) === 4"
          clickable
          to="/admin/dashboard"
          class="drawer-link"
        >
          <q-item-section>
            <q-icon name="settings" />
            <span class="q-ml-sm">Panel de Control</span>
          </q-item-section>
        </q-item>
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
          <q-item clickable to="/admin/perfil" class="drawer-link">
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
          <q-item clickable @click="goToPerfil" class="drawer-link">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>Mi Perfil</q-item-section>
          </q-item>
          <q-item clickable to="/mis-articulos" class="drawer-link">
            <q-item-section avatar>
              <q-icon name="article" />
            </q-item-section>
            <q-item-section>Mis Artículos</q-item-section>
          </q-item>
          <q-item
            v-if="[1, 2].includes(Number(user.rolId))"
            clickable
            to="/mis-cursos"
            class="drawer-link"
          >
            <q-item-section avatar>
              <q-icon name="school" />
            </q-item-section>
            <q-item-section>Mis Cursos</q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <ChatBot />
  </q-layout>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import EssentialLink from 'components/EssentialLink.vue'
import ChatBot from 'src/components/auth/ChatBot.vue'

const router = useRouter()
const user = ref(JSON.parse(localStorage.getItem('user')) || {})

window.addEventListener('storage', () => {
  user.value = JSON.parse(localStorage.getItem('user')) || {}
})

watchEffect(() => {
  console.log('Usuario actual:', user.value)
})

const linksList = computed(() => [
  { title: 'Inicio', caption: '', icon: 'home', link: '/' },
  { title: 'Revistas', caption: '', icon: 'menu_book', link: '/revistas' },
  { title: 'Artículos', caption: '', icon: 'description', link: '/articulos' },
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

function goToPerfil() {
  router.push('/perfil')
  rightDrawerOpen.value = false
}
</script>

<style scoped>
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
