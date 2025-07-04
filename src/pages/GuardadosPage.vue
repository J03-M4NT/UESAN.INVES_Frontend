<template>
  <q-page padding>
    <h1 class="text-h5 q-mb-md">Mis elementos guardados</h1>

    <div v-if="guardadosFiltrados.length === 0">No has guardado ninguna revista aún.</div>

    <div class="row q-col-gutter-md" v-else>
      <div
        class="col-12 col-md-6 col-lg-4"
        v-for="g in guardadosFiltrados"
        :key="g.listasCerradasId"
      >
        <q-card>
          <q-card-section>
            <div class="text-subtitle1">
              {{ g.revista?.nombre || 'Sin título' }}
            </div>
            <div class="text-caption text-grey">
              Incentivo: ${{ g.revista?.incentivoUsd || 0 }} <br />
              Fecha publicación: {{ formatFecha(g.revista?.fechaPublicacion) }} <br />
              Guardado el: {{ formatFecha(g.fechaGuardado) }}
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Detalles" color="primary" @click="verDetalle(g.revista)" />
            <q-btn
              flat
              label="Eliminar"
              color="red"
              @click="eliminarGuardado(g.listasCerradasId)"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>

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
import { ref, onMounted, computed } from 'vue'
import { api } from 'boot/axios'

const guardados = ref([])
const revistas = ref([])
const user = JSON.parse(localStorage.getItem('user'))
const dialogoDetalle = ref(false)
const revistaDetalle = ref({})
const lineas = ref([])

onMounted(async () => {
  try {
    // Cargar revistas
    const resRev = await api.get('/api/ListasCerradas')
    revistas.value = resRev.data['$values'] || resRev.data || []
    // Cargar categorías para detalles
    const resCat = await api.get('/api/Categorias')
    lineas.value = resCat.data
    // Cargar guardados
    if (user && user.usuarioId) {
      try {
        const res = await api.get(`/api/ListasCerradasGuardadas?usuarioId=${user.usuarioId}`)
        guardados.value = res.data['$values'] || res.data || []
      } catch (err) {
        if (err.response && err.response.status === 404) {
          guardados.value = []
        } else {
          console.error('Error cargando revistas guardadas:', err)
        }
      }
    }
  } catch (err) {
    console.error('Error cargando revistas:', err)
  }
})

const eliminarGuardado = async (listasCerradasId) => {
  try {
    if (user && user.usuarioId) {
      await api.delete(`/api/ListasCerradasGuardadas/${user.usuarioId}/${listasCerradasId}`)
      // Recargar guardados desde backend para asegurar consistencia
      const res = await api.get(`/api/ListasCerradasGuardadas?usuarioId=${user.usuarioId}`)
      guardados.value = res.data['$values'] || res.data || []
    }
  } catch (err) {
    if (err.response && err.response.status === 404) {
      guardados.value = []
    } else {
      console.error('Error eliminando guardado:', err)
    }
  }
}

const formatFecha = (fecha) => {
  if (!fecha) return 'N/A'
  const d = new Date(fecha)
  return isNaN(d) ? 'N/A' : d.toLocaleDateString()
}

const getCategoriaNombre = (categoriaId) => {
  const cat = lineas.value.find((c) => c.categoriaId === categoriaId)
  return cat ? cat.nombreCategoria : 'N/A'
}

const guardadosFiltrados = computed(() => {
  // Solo mostrar guardados del usuario actual y cruzar con revistas
  const unicos = {}
  for (const g of guardados.value) {
    // Si el guardado no es del usuario actual, lo ignora
    if (g.usuarioId !== user.usuarioId) continue
    if (!unicos[g.listasCerradasId]) {
      const revista = revistas.value.find((r) => r.listasCerradasId === g.listasCerradasId)
      unicos[g.listasCerradasId] = { ...g, revista }
    }
  }
  return Object.values(unicos)
})

const verDetalle = (revista) => {
  revistaDetalle.value = { ...revista }
  dialogoDetalle.value = true
}
</script>

<style scoped></style>
