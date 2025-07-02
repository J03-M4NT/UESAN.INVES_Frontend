<template>
  <q-page padding>
    <!-- Hero Section -->
    <div class="hero-banner-img q-mb-lg">
      <div class="hero-banner-content">
        <h1 class="text-h4">Vicerrectorado de Investigación</h1>
        <p>
          Descubre todos los servicios que ofrecemos para potenciar tus habilidades investigativas.
        </p>
        <q-btn color="secondary" label="Ver servicios" @click="scrollTo('servicios')" />
      </div>
    </div>

    <!-- Servicios -->
    <div class="q-mt-xl" id="servicios">
      <h2 class="text-h5 q-mb-md text-center text-white text-shadow">Servicios</h2>
      <div class="servicios-grid">
        <div v-for="(servicio, index) in servicios" :key="index" class="servicio-card">
          <img
            src="https://th.bing.com/th/id/R.0612d98df402be48ef0bd38388fad856?rik=gbtdYNb6Tjj7pw&pid=ImgRaw&r=0"
            alt="icono servicio"
            class="servicio-img"
          />
          <div class="servicio-nombre">{{ servicio.nombre }}</div>
        </div>
      </div>
    </div>

    <!-- Revistas Recurrentes -->
    <div class="q-mt-xl" id="revistas">
      <h2 class="text-h5 q-mb-md">Revistas recurrentes</h2>
      <q-card v-for="(revista, index) in revistasRecurrentes" :key="index" class="q-mb-md">
        <q-card-section>
          <div class="text-subtitle1">{{ revista.nombre }}</div>
          <div class="text-caption text-grey">Leída {{ revista.vecesLeida }} veces</div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Call to Action -->
    <div class="q-mt-xl text-center">
      <h3 class="text-h6">¿Quieres generar una publicación?</h3>
      <q-btn color="primary" label="Ingresa aquí" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { scroll } from 'quasar'

const { setVerticalScrollPosition } = scroll

const servicios = ref([
  { nombre: 'Asesoría en proyectos de investigación', icon: 'school' },
  { nombre: 'Acceso a convocatorias de fondos', icon: 'attach_money' },
  { nombre: 'Publicación en revistas científicas', icon: 'menu_book' },
  { nombre: 'Red de investigadores', icon: 'people' },
  { nombre: 'Talleres y capacitaciones', icon: 'event' },
])

// Simulación de revistas con contador de lecturas
const revistas = ref([
  { nombre: 'Revista Científica UXYZ – Vol. 12, No. 3', vecesLeida: 12 },
  { nombre: 'Avances en Investigación', vecesLeida: 8 },
  { nombre: 'Innovación Académica', vecesLeida: 5 },
  { nombre: 'Ciencia y Sociedad', vecesLeida: 3 },
  { nombre: 'Gestión Empresarial', vecesLeida: 2 },
])

// Las 3 revistas más leídas
const revistasRecurrentes = computed(() =>
  [...revistas.value].sort((a, b) => b.vecesLeida - a.vecesLeida).slice(0, 3),
)

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) setVerticalScrollPosition(window, el.offsetTop, 500)
}
</script>

<style scoped>
.hero-banner-img {
  background: url('https://th.bing.com/th/id/R.0612d98df402be48ef0bd38388fad856?rik=gbtdYNb6Tjj7pw&pid=ImgRaw&r=0')
    center center/cover no-repeat;
  border-radius: 20px;
  color: #fff;
  text-align: center;
  margin-top: 1.5rem;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.07);
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.hero-banner-content {
  background: rgba(0, 0, 0, 0.45);
  border-radius: 16px;
  padding: 2.5rem 1rem 1.5rem 1rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
.servicios-grid {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}
.servicio-card {
  background: #e51a3b;
  color: #fff;
  border-radius: 18px;
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.07);
  transition: transform 0.2s;
  padding: 0.5rem;
}
.servicio-card:hover {
  transform: translateY(-6px) scale(1.05);
}
.servicio-img {
  width: 48px;
  height: 48px;
  object-fit: contain;
  margin-bottom: 0.5rem;
  filter: brightness(0) invert(1); /* blanco sobre fondo rojo */
}
.servicio-nombre {
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  margin-top: 0.2rem;
  line-height: 1.2;
}
.text-shadow {
  text-shadow: 1px 1px 4px #444;
}
</style>
