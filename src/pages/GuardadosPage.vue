<template>
  <q-page padding>
    <h1 class="text-h5 q-mb-md">Mis elementos guardados</h1>

    <div v-if="guardadosFiltrados.length === 0">No has guardado ninguna revista aún.</div>

    <div class="row q-col-gutter-md" v-else>
      <div class="col-12 col-md-6 col-lg-4" v-for="g in guardadosFiltrados" :key="g.id">
        <q-card>
          <q-card-section>
            <div class="text-subtitle1">{{ g.publicacion?.nombre || 'Sin título' }}</div>
            <div class="text-caption text-grey">
              Incentivo: ${{ g.publicacion?.incentivoUsd || 0 }} <br />
              Fecha publicación: {{ formatFecha(g.publicacion?.fechaPublicacion) }} <br />
              Guardado el: {{ formatFecha(g.fechaGuardado) }}
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Eliminar" color="red" @click="eliminarGuardado(g.id)" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { api } from 'boot/axios'

const guardados = ref([])

onMounted(async () => {
  try {
    const res = await api.get('/api/publicacionesguardadas')
    guardados.value = res.data['$values'] || []
  } catch (err) {
    console.error('Error cargando publicaciones guardadas:', err)
  }
})

const eliminarGuardado = async (id) => {
  try {
    await api.delete(`/api/publicacionesguardadas/${id}`)
    guardados.value = guardados.value.filter((g) => g.id !== id)
  } catch (err) {
    console.error('Error eliminando guardado:', err)
  }
}

const formatFecha = (fecha) => {
  if (!fecha) return 'N/A'
  const d = new Date(fecha)
  return isNaN(d) ? 'N/A' : d.toLocaleDateString()
}

const guardadosFiltrados = computed(() => {
  return guardados.value.filter((g) => g.publicacion)
})
</script>

<style scoped></style>
