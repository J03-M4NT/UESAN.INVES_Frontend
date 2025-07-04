<template>
  <q-page padding>
    <div class="row items-center q-mb-md">
      <div class="col">
        <h1 class="text-h5">Propuestas de Revistas</h1>
      </div>
      <div class="col-auto">
        <q-btn color="primary" icon="download" label="Exportar Excel" @click="exportarExcel" />
      </div>
    </div>

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
            <div><b>Correo:</b> {{ propuestaSeleccionada.correoUsuario }}</div>
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
import * as XLSX from 'xlsx'

const propuestas = ref([])
const loading = ref(false)
const dialogoDetalles = ref(false)
const propuestaSeleccionada = ref({})
const categorias = ref([])
const usuariosCache = ref({})

const columns = [
  { name: 'tema', label: 'Tema', field: 'tema', align: 'left' },
  { name: 'profesorNombre', label: 'Profesor', field: 'profesorNombre', align: 'left' },
  { name: 'detalles', label: 'Detalles', field: 'detalles', align: 'center' },
]

const getCategoriaNombre = (categoriaId) => {
  const cat = categorias.value.find((c) => c.categoriaId === categoriaId)
  return cat ? cat.nombreCategoria : 'N/A'
}

const getUsuarioInfo = async (usuarioId) => {
  if (!usuarioId) return { nombreCompleto: 'N/A', correo: 'N/A' }
  if (usuariosCache.value[usuarioId]) return usuariosCache.value[usuarioId]
  try {
    const res = await api.get(`/api/Usuarios/${usuarioId}`)
    const nombreCompleto = res.data?.nombre + ' ' + (res.data?.apellido || '')
    const correo = res.data?.correo || 'N/A'
    const info = { nombreCompleto, correo }
    usuariosCache.value[usuarioId] = info
    return info
  } catch {
    return { nombreCompleto: 'N/A', correo: 'N/A' }
  }
}

const fetchPropuestas = async () => {
  loading.value = true
  try {
    // Cargar categorías
    const catRes = await api.get('/api/Categorias')
    categorias.value = catRes.data
    // Cargar propuestas
    const res = await api.get('/api/Propuestas')
    let propuestasRaw = res.data['$values'] || res.data || []
    // Enriquecer propuestas con nombre de categoría y nombre de profesor
    propuestas.value = await Promise.all(
      propuestasRaw.map(async (p) => {
        // Nombre de categoría
        const categoriaNombre = getCategoriaNombre(p.categoriaId)
        // Nombre de profesor y correo
        let profesorNombre = 'N/A'
        let correoUsuario = 'N/A'
        if (p.usuarioId) {
          const info = await getUsuarioInfo(p.usuarioId)
          profesorNombre = info.nombreCompleto
          correoUsuario = info.correo
        }
        return {
          ...p,
          categoriaNombre,
          profesorNombre,
          correoUsuario,
        }
      }),
    )
  } catch (err) {
    console.error('Error cargando propuestas:', err)
  } finally {
    loading.value = false
  }
}

const verDetalles = async (propuesta) => {
  // Enriquecer detalles con nombre de categoría, profesor y correo
  const categoriaNombre = getCategoriaNombre(propuesta.categoriaId)
  let profesorNombre = 'N/A'
  let correoUsuario = 'N/A'
  if (propuesta.usuarioId) {
    const info = await getUsuarioInfo(propuesta.usuarioId)
    profesorNombre = info.nombreCompleto
    correoUsuario = info.correo
  }
  propuestaSeleccionada.value = {
    ...propuesta,
    categoriaNombre,
    profesorNombre,
    correoUsuario,
  }
  dialogoDetalles.value = true
}

// Función para exportar propuestas a Excel
const exportarExcel = () => {
  // Prepara los datos para el Excel
  const data = propuestas.value.map((p) => ({
    Tema: p.tema,
    Descripción: p.descripcion,
    Categoría: p.categoriaNombre,
    Incentivo: p.incentivo,
    Correo: p.correoUsuario,
    Profesor: p.profesorNombre,
  }))
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Propuestas')
  XLSX.writeFile(wb, 'propuestas.xlsx')
}

onMounted(fetchPropuestas)
</script>
