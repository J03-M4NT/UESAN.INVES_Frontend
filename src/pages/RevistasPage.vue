<template>
  <q-page padding>
    <div class="revistas-hero q-mb-lg">
      <h1 class="text-h4 text-center q-mb-xs">Revistas recomendadas</h1>
      <div class="text-subtitle2 text-center">
        Descubre revistas científicas recomendadas por ESAN para potenciar tu investigación.
      </div>
    </div>

    <!-- Filtro por línea de investigación -->
    <q-select
      filled
      v-model="lineaSeleccionada"
      label="Selecciona tu línea de investigación"
      :options="lineas"
      emit-value
      map-options
      class="q-mb-xl"
    />

    <!-- Lista de revistas -->
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6 col-lg-4" v-for="revista in revistasFiltradas" :key="revista.id">
        <q-card>
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-subtitle1">{{ revista.titulo }}</div>
                <div class="text-caption text-grey">
                  Línea: {{ revista.linea }} <br />
                  Índice: {{ revista.indice }}
                </div>
              </div>
              <q-btn
                flat
                icon="bookmark"
                @click="guardarRevista(revista.id)"
                :color="estaGuardada(revista.id) ? 'red' : 'grey'"
                class="q-ml-md"
              />
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Ver más" :href="revista.enlace" target="_blank" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'

const lineaSeleccionada = ref(null)

const lineas = [
  { label: 'Negocios Internacionales', value: 'negocios' },
  { label: 'Finanzas', value: 'finanzas' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Innovación y Tecnología', value: 'tecnologia' },
]

const revistas = ref([
  {
    id: 1,
    titulo: 'International Business Review',
    linea: 'negocios',
    indice: 'Scopus Q1',
    enlace: 'https://www.journals.elsevier.com/international-business-review',
  },
  {
    id: 2,
    titulo: 'Journal of Corporate Finance',
    linea: 'finanzas',
    indice: 'Scopus Q1',
    enlace: 'https://www.journals.elsevier.com/journal-of-corporate-finance',
  },
  {
    id: 3,
    titulo: 'Journal of Marketing',
    linea: 'marketing',
    indice: 'Scopus Q1',
    enlace: 'https://journals.sagepub.com/home/jmx',
  },
  {
    id: 4,
    titulo: 'Research Policy',
    linea: 'tecnologia',
    indice: 'Scopus Q1',
    enlace: 'https://www.journals.elsevier.com/research-policy',
  },
])

const revistasFiltradas = computed(() => {
  if (!lineaSeleccionada.value) return revistas.value
  return revistas.value.filter((r) => r.linea === lineaSeleccionada.value)
})

const guardarRevista = (id) => {
  let guardadas = JSON.parse(localStorage.getItem('revistasGuardadas')) || []
  if (!guardadas.includes(id)) {
    guardadas.push(id)
  } else {
    guardadas = guardadas.filter((item) => item !== id)
  }
  localStorage.setItem('revistasGuardadas', JSON.stringify(guardadas))
}

const estaGuardada = (id) => {
  const guardadas = JSON.parse(localStorage.getItem('revistasGuardadas')) || []
  return guardadas.includes(id)
}
</script>

<style scoped>
.revistas-hero {
  background: #e51c3b;
  color: #fff;
  border-radius: 24px;
  padding: 2rem 1rem 1.5rem 1rem;
  margin-top: 12px;
}
</style>
