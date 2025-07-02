<!-- TODO: PANEL PARA ADMINISTRADOR -->
<!-- Tener instalado libreria para vista previa: npm install xlsx-->

<template>
  <q-page class="q-pa-xl flex flex-center">
    <!-- PANEL DE GESTIÓN ADMINISTRADOR -->
    <div class="dashboard-container">
      <div class="text-h5 q-mb-md">
        Bienvenido, {{ user.nombre || 'Usuario' }} {{ user.apellido || '' }}
      </div>
      <div class="text-subtitle1">
        Rol: {{ user.rolId === 4 ? 'Administrador' : 'No asignado' }}
      </div>
      <q-separator class="q-my-md" />
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-subtitle2">⚙️ Panel de gestión</div>
        </q-card-section>
        <q-card-actions vertical>
          <q-btn label="USUARIOS" color="primary" flat />
          <q-btn label="CATEGORÍAS" color="primary" flat />
          <q-btn label="PUBLICACIONES" color="primary" flat />
        </q-card-actions>
      </q-card>
    </div>

    <!-- CONTAINER 1: INGRESAR DATOS PROFESORES (TEST) -->
    <div class="import-container q-mt-xl">
      <div class="text-h6 q-mb-md">Ingresar datos Profesores (test)</div>
      <div class="row items-center q-gutter-md">
        <q-btn color="primary" label="Importar" @click="openFile" />
        <q-icon v-if="fileImported" name="check_circle" color="positive" size="32px" />
        <input
          ref="fileInput"
          type="file"
          accept=".xlsx,.xls,.csv"
          class="hidden"
          @change="onFileChange"
        />
      </div>
      <!-- Vista previa del archivo importado -->
      <div v-if="fileImported && excelPreview.length" class="q-mt-lg">
        <q-card>
          <q-card-section>
            <div class="text-subtitle2 q-mb-sm">Vista previa del archivo</div>
            <!-- Scroll horizontal y vertical SOLO en la tabla -->
            <div style="width: 100%; overflow-x: auto">
              <div style="min-width: 1100px; max-height: 350px; height: 350px; overflow: auto">
                <q-table
                  :rows="excelPreview"
                  :columns="excelColumns"
                  dense
                  flat
                  bordered
                  hide-pagination
                  :rows-per-page-options="[5]"
                  :pagination="{ rowsPerPage: 100 }"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
        <div class="q-mt-md">
          <q-btn color="secondary" label="btn_insercion" />
        </div>
      </div>
    </div>

    <!-- CONTAINER 2: INGRESAR REVISTAS -->
    <div class="import-container q-mt-xl">
      <div class="text-h6 q-mb-md">Ingresar revistas</div>
      <div class="row items-center q-gutter-md">
        <q-btn color="primary" label="Importar" @click="openFileRevistas" />
        <q-icon v-if="fileImportedRevistas" name="check_circle" color="positive" size="32px" />
        <input
          ref="fileInputRevistas"
          type="file"
          accept=".xlsx,.xls,.csv"
          class="hidden"
          @change="onFileChangeRevistas"
        />
      </div>
      <!-- Vista previa del archivo importado -->
      <div v-if="fileImportedRevistas && excelPreviewRevistas.length" class="q-mt-lg">
        <q-card>
          <q-card-section>
            <div class="text-subtitle2 q-mb-sm">Vista previa del archivo</div>
            <!-- Scroll horizontal y vertical SOLO en la tabla -->
            <div style="width: 100%; overflow-x: auto">
              <div style="min-width: 1100px; max-height: 350px; height: 350px; overflow: auto">
                <q-table
                  :rows="excelPreviewRevistas"
                  :columns="excelColumnsRevistas"
                  dense
                  flat
                  bordered
                  hide-pagination
                  :rows-per-page-options="[5]"
                  :pagination="{ rowsPerPage: 100 }"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
        <div class="q-mt-md">
          <q-btn color="secondary" label="btn_insercion" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
// Importaciones principales
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import * as XLSX from 'xlsx' // Librería para leer archivos Excel

// Usuario actual y protección de ruta
const user = ref(JSON.parse(localStorage.getItem('user')) || {})
const router = useRouter()

// ==================== CONTAINER 1: PROFESORES (TEST) ====================
const fileInput = ref(null) // Referencia al input de archivo
const fileImported = ref(false) // Estado de importación
const excelPreview = ref([]) // Datos para la tabla de vista previa
const excelColumns = ref([]) // Columnas para la tabla

// Abrir el selector de archivos
function openFile() {
  fileInput.value && fileInput.value.click()
}

// Leer y procesar archivo Excel/CSV
function onFileChange(e) {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (evt) => {
    const data = evt.target.result
    // Leer archivo con XLSX (soporta .xlsx, .xls, .csv)
    const workbook = XLSX.read(data, { type: 'array' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
    if (json.length) {
      excelColumns.value = json[0].map((h, i) => ({
        name: `col${i}`,
        label: h,
        field: (row) => row[i],
        align: 'left',
      }))
      excelPreview.value = json.slice(1) // Mostrar todas las filas
      fileImported.value = true
    }
  }
  reader.readAsArrayBuffer(file)
}

// ==================== CONTAINER 2: REVISTAS ====================
const fileInputRevistas = ref(null)
const fileImportedRevistas = ref(false)
const excelPreviewRevistas = ref([])
const excelColumnsRevistas = ref([])

// Abrir el selector de archivos para revistas
function openFileRevistas() {
  fileInputRevistas.value && fileInputRevistas.value.click()
}

// Leer y procesar archivo Excel/CSV para revistas
function onFileChangeRevistas(e) {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (evt) => {
    const data = evt.target.result
    const workbook = XLSX.read(data, { type: 'array' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
    if (json.length) {
      excelColumnsRevistas.value = json[0].map((h, i) => ({
        name: `col${i}`,
        label: h,
        field: (row) => row[i],
        align: 'left',
      }))
      excelPreviewRevistas.value = json.slice(1) // Mostrar todas las filas
      fileImportedRevistas.value = true
    }
  }
  reader.readAsArrayBuffer(file)
}

// Redirección si no es admin
onMounted(() => {
  if (Number(user.value.rolId) !== 4) {
    router.push('/')
  }
})
</script>

<style scoped>
.dashboard-container {
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(44, 62, 80, 0.1);
  padding: 2.5rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.import-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(44, 62, 80, 0.08);
  padding: 2.5rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
}
</style>
