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
        <div
          v-for="(servicio, index) in servicios"
          :key="index"
          class="servicio-card"
          @click="scrollTo('servicio-' + index)"
          style="cursor: pointer"
        >
          <q-icon :name="servicio.icon" size="38px" class="servicio-icon q-mb-sm" />
          <div class="servicio-nombre">{{ servicio.nombre }}</div>
        </div>
      </div>
    </div>

    <!-- Secciones de información de cada servicio -->
    <div
      v-for="(servicio, index) in servicios"
      :key="'info-' + index"
      :id="'servicio-' + index"
      class="servicio-info-section q-mb-xl"
    >
      <q-card class="q-mx-auto q-pa-md" style="max-width: 500px">
        <q-card-section>
          <div class="text-h6">{{ servicio.nombre }}</div>
          <div class="text-body2 q-mt-sm">
            {{ servicio.descripcion || 'Próximamente más información sobre este servicio.' }}
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Call to Action -->
    <div class="q-mt-xl text-center">
      <h3 class="text-h6">¿Quieres saber más de las revistas publicadas?</h3>
      <q-btn color="primary" label="Ingresa aquí" />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { scroll } from 'quasar'

const { setVerticalScrollPosition } = scroll

const servicios = ref([
  {
    nombre: 'Asesoría en proyectos de investigación',
    icon: 'school',
    descripcion:
      'Te ayudamos a planificar, ejecutar y mejorar tus proyectos de investigación con asesoría especializada.',
  },
  {
    nombre: 'Acceso a convocatorias de fondos',
    icon: 'attach_money',
    descripcion:
      'Infórmate y postula a las últimas convocatorias de financiamiento para tus investigaciones.',
  },
  {
    nombre: 'Publicación en revistas científicas',
    icon: 'menu_book',
    descripcion:
      'Te orientamos en el proceso de publicación de tus artículos en revistas científicas reconocidas.',
  },
  {
    nombre: 'Red de investigadores',
    icon: 'people',
    descripcion: 'Conéctate y colabora con otros investigadores de la comunidad académica.',
  },
  {
    nombre: 'Talleres y capacitaciones',
    icon: 'event',
    descripcion:
      'Participa en talleres y capacitaciones para fortalecer tus competencias investigativas.',
  },
])

function scrollTo(id) {
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
