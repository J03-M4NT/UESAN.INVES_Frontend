<template>
  <q-page padding>
    <div class="q-pa-md bg-primary text-white text-center">
      <h1 class="text-h4">Revistas</h1>
      <p>Explora las revistas científicas y académicas disponibles en la plataforma.</p>
    </div>
    <div class="q-mt-xl">
      <h2 class="text-h5 q-mb-md">Listado de Revistas</h2>
      <q-list bordered>
        <q-item v-for="revista in revistas" :key="revista.id" clickable>
          <q-item-section avatar>
            <q-icon name="menu_book" />
          </q-item-section>
          <q-item-section>
            <div class="text-subtitle1">{{ revista.nombre }}</div>
            <div class="text-caption">{{ revista.descripcion }}</div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const revistas = ref([
  {
    id: 1,
    nombre: 'Revista ESAN',
    descripcion: 'Publicaciones de investigación de la universidad.',
  },
  {
    id: 2,
    nombre: 'Ciencia y Sociedad',
    descripcion: 'Revista multidisciplinaria de ciencia y sociedad.',
  },
  {
    id: 3,
    nombre: 'Innovación y Empresa',
    descripcion: 'Tendencias y estudios sobre innovación empresarial.',
  },
])
</script>

<style scoped>
.bg-primary {
  background: #d32f2f !important;
}
</style>
