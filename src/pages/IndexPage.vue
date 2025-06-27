<template>
  <q-page padding>
    <!-- Hero Section -->
    <div class="q-pa-md bg-primary text-white text-center">
      <h1 class="text-h4">Vicerrectorado de Investigación</h1>
      <p>
        Descubre todos los servicios que ofrecemos para potenciar tus habilidades investigativas.
      </p>
      <q-btn color="secondary" label="Ver servicios" @click="scrollTo('servicios')" />
    </div>

    <!-- Servicios -->
    <div class="q-mt-xl" id="servicios">
      <h2 class="text-h5 q-mb-md">Servicios que ofrecemos</h2>
      <q-list bordered class="q-mb-xl">
        <q-item v-for="(servicio, index) in servicios" :key="index" clickable>
          <q-item-section avatar>
            <q-icon :name="servicio.icon" />
          </q-item-section>
          <q-item-section>
            {{ servicio.nombre }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <!-- Revistas Recientes -->
    <div class="q-mt-xl" id="revistas">
      <h2 class="text-h5 q-mb-md">Revistas leídas recientemente</h2>
      <q-card v-for="(revista, index) in revistas" :key="index" class="q-mb-md">
        <q-card-section>
          <div class="text-subtitle1">{{ revista.titulo }}</div>
          <div class="text-caption text-grey">{{ revista.fecha }}</div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Revistas Destacadas -->
    <div class="q-mt-xl" id="revistas">
      <h2 class="text-h5 q-mb-md">Revistas</h2>
      <q-list bordered>
        <q-item v-for="revista in revistasDestacadas" :key="revista.id" clickable>
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

    <!-- Call to Action -->
    <div class="q-mt-xl text-center">
      <h3 class="text-h6">¿Quieres formar parte de nuestros proyectos?</h3>
      <q-btn color="primary" label="Postula a una convocatoria" />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { scroll } from 'quasar'

const { setVerticalScrollPosition } = scroll

const servicios = ref([
  { nombre: 'Asesoría en proyectos de investigación', icon: 'school' },
  { nombre: 'Acceso a convocatorias de fondos', icon: 'attach_money' },
  { nombre: 'Publicación en revistas científicas', icon: 'menu_book' },
  { nombre: 'Red de investigadores', icon: 'people' },
  { nombre: 'Talleres y capacitaciones', icon: 'event' },
])

const revistas = ref([
  { titulo: 'Revista Científica UXYZ – Vol. 12, No. 3', fecha: 'Mayo 2025' },
  { titulo: 'Avances en Investigación', fecha: 'Abril 2025' },
  { titulo: 'Innovación Académica', fecha: 'Marzo 2025' },
])

const revistasDestacadas = ref([
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

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) setVerticalScrollPosition(window, el.offsetTop, 500)
}
</script>
