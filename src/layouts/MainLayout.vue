<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="custom-header">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> Vicerrectorado de Investigación </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="custom-drawer">
      <q-list>
        <q-item-label header class="drawer-header"> Opciones: </q-item-label>
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
          class="drawer-link"
        />
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>

    <ChatBot />
  </q-layout>
</template>

<script setup>
import { computed, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import ChatBot from 'src/components/auth/ChatBot.vue'

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
/* Estilo para el enlace activo */
</style>
