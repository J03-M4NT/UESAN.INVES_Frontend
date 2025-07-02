<template>
  <q-page padding>
    <div class="revistas-hero q-mb-lg">
      <h1 class="text-h4 text-center q-mb-xs">Revistas recomendadas</h1>
      <div class="text-subtitle2 text-center">
        Descubre revistas científicas recomendadas por ESAN para potenciar tu investigación.
      </div>
    </div>

    <!-- Select de líneas de investigación (categorías) -->
    <q-select
      filled
      v-model="lineaSeleccionada"
      label="Selecciona tu línea de investigación"
      :options="lineas"
      option-label="nombreCategoria"
      option-value="categoriaId"
      emit-value
      map-options
      class="q-mb-xl"
      clearable
    />

    <!-- Buscador de revistas por nombre -->
    <q-input
      filled
      v-model="busquedaRevista"
      label="Buscar revista por nombre"
      class="q-mb-xl"
      clearable
    />

    <div class="row q-col-gutter-md">
      <div
        class="col-12 col-md-6 col-lg-4"
        v-for="revista in revistasFiltradas"
        :key="revista.listasCerradasId"
      >
        <q-card>
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-subtitle1">{{ revista.nombre }}</div>
                <div class="text-caption text-grey">
                  Línea: {{ getCategoriaNombre(revista.categoriaId) || 'N/A' }} <br />
                  Incentivo: ${{ revista.incentivoUsd || 0 }} <br />
                  Puntaje: {{ revista.puntaje || 'N/A' }}
                </div>
              </div>
              <q-btn
                flat
                icon="bookmark"
                @click="guardarRevista(revista.listasCerradasId)"
                :color="estaGuardada(revista.listasCerradasId) ? 'red' : 'grey'"
                class="q-ml-md"
              />
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Ver detalles" @click="verDetalle(revista)" />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <!-- Diálogo de detalle de revista -->
    <q-dialog v-model="dialogoDetalle">
      <q-card style="min-width: 350px; max-width: 95vw">
        <q-card-section>
          <div class="text-h6">{{ revistaDetalle.nombre }}</div>
          <div class="q-mt-sm">
            <div>
              <b>Categoría:</b> {{ getCategoriaNombre(revistaDetalle.categoriaId) || 'N/A' }}
            </div>
            <div><b>ISSN:</b> {{ revistaDetalle.issn || 'N/A' }}</div>
            <div><b>ISSN2:</b> {{ revistaDetalle.issn2 || 'N/A' }}</div>
            <div><b>ISSN3:</b> {{ revistaDetalle.issn3 || 'N/A' }}</div>
            <div><b>Puntaje:</b> {{ revistaDetalle.puntaje || 'N/A' }}</div>
            <div><b>Incentivo (USD):</b> {{ revistaDetalle.incentivoUsd || 'N/A' }}</div>
            <div><b>SCOPUS:</b> {{ revistaDetalle.scopus || 'N/A' }}</div>
            <div><b>WoS (Q):</b> {{ revistaDetalle.woSQ || 'N/A' }}</div>
            <div><b>ESCI Q:</b> {{ revistaDetalle.esciQ || 'N/A' }}</div>
            <div><b>AJG:</b> {{ revistaDetalle.ajg || 'N/A' }}</div>
            <div><b>CNRS:</b> {{ revistaDetalle.cnrs || 'N/A' }}</div>
            <div><b>ABDC:</b> {{ revistaDetalle.abdc || 'N/A' }}</div>
            <div><b>WoS LATAM:</b> {{ revistaDetalle.woSLatam || 'N/A' }}</div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { api } from 'boot/axios'

const lineaSeleccionada = ref(null)
const busquedaRevista = ref('')
const revistas = ref([])
const lineas = ref([])
const dialogoDetalle = ref(false)
const revistaDetalle = ref({})

onMounted(async () => {
  try {
    // Cargar categorías
    const categoriasRes = await api.get('/api/Categorias')
    lineas.value = categoriasRes.data

    // Cargar revistas
    const res = await api.get('/api/ListasCerradas')
    const data = res.data.$values || res.data || []

    revistas.value = data.map((r) => ({
      listasCerradasId: r.listasCerradasId,
      nombre: r.nombre,
      categoriaId: r.categoriaId,
      issn: r.issn,
      issn2: r.issn2,
      issn3: r.issn3,
      puntaje: r.puntaje,
      incentivoUsd: r.incentivoUsd,
      scopus: r.scopus,
      woSQ: r.woSQ,
      esciQ: r.esciQ,
      ajg: r.ajg,
      cnrs: r.cnrs,
      abdc: r.abdc,
      woSLatam: r.woSLatam,
    }))
  } catch (err) {
    console.error('Error cargando datos:', err)
  }
})

const revistasFiltradas = computed(() => {
  let resultado = revistas.value
  if (lineaSeleccionada.value) {
    resultado = resultado.filter((r) => r.categoriaId === lineaSeleccionada.value)
  }
  if (busquedaRevista.value) {
    const texto = busquedaRevista.value.toLowerCase()
    resultado = resultado.filter((r) => r.nombre && r.nombre.toLowerCase().includes(texto))
  }
  return resultado
})

const getCategoriaNombre = (categoriaId) => {
  const cat = lineas.value.find((c) => c.categoriaId === categoriaId)
  return cat ? cat.nombreCategoria : 'N/A'
}

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

const verDetalle = (revista) => {
  revistaDetalle.value = { ...revista }
  dialogoDetalle.value = true
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
