<template>
  <q-page padding>
    <h1 class="text-h5 q-mb-md">Propuestas de Revistas</h1>
    <q-table
      :rows="propuestas"
      :columns="columns"
      row-key="id"
      flat
      bordered
      :loading="loading"
      :rows-per-page-options="[5, 10, 20]"
    >
      <template v-slot:body-cell-detalles="props">
        <q-td>
          <q-btn color="primary" label="Ver detalles" @click="verDetalles(props.row)" />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="dialogoDetalles">
      <q-card style="min-width: 350px; max-width: 95vw">
        <q-card-section>
          <div class="text-h6">Detalles de la Propuesta</div>
          <div class="q-mt-sm">
            <div><b>Tema:</b> {{ propuestaSeleccionada.tema }}</div>
            <div><b>Descripción:</b> {{ propuestaSeleccionada.descripcion }}</div>
            <div><b>Categoría:</b> {{ propuestaSeleccionada.categoriaNombre }}</div>
            <div><b>Incentivo:</b> {{ propuestaSeleccionada.incentivo }}</div>
            <div><b>Correo:</b> {{ propuestaSeleccionada.correo }}</div>
            <div class="q-mt-md"><b>Profesor:</b> {{ propuestaSeleccionada.profesorNombre }}</div>
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
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'

const propuestas = ref([])
const loading = ref(false)
const dialogoDetalles = ref(false)
const propuestaSeleccionada = ref({})

const columns = [
  { name: 'tema', label: 'Tema', field: 'tema', align: 'left' },
  { name: 'profesorNombre', label: 'Profesor', field: 'profesorNombre', align: 'left' },
  { name: 'detalles', label: 'Detalles', field: 'detalles', align: 'center' },
]

const fetchPropuestas = async () => {
  loading.value = true
  try {
    // Reemplaza con tu endpoint real
    const res = await api.get('/api/Propuestas')
    propuestas.value = res.data['$values'] || res.data || []
  } catch (err) {
    console.error('Error cargando propuestas:', err)
  } finally {
    loading.value = false
  }
}

const verDetalles = (propuesta) => {
  propuestaSeleccionada.value = { ...propuesta }
  dialogoDetalles.value = true
}

onMounted(fetchPropuestas)
</script>
