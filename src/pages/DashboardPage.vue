<!-- TODO: PANEL PARA ADMINISTRADOR -->
<!-- Tener instalado libreria para vista previa: npm install xlsx-->

<template>
  <q-page class="q-pa-xl flex flex-center" style="flex-direction: column; align-items: center">
    <!-- PANEL DE GESTIÓN ADMINISTRADOR -->
    <div class="dashboard-container">
      <div class="text-h4 q-mb-md text-center">
        Bienvenido, {{ user.nombre || 'Usuario' }} {{ user.apellido || '' }}
      </div>
      <q-card class="q-mb-md dashboard-card">
        <q-card-section class="row items-center justify-center">
          <q-icon name="settings" size="32px" color="primary" class="q-mr-md" />
          <span class="text-h6 text-bold">Panel de gestión</span>
        </q-card-section>
      </q-card>
    </div>
    <!-- CONTAINER 1: INGRESAR DATOS PUBLICACIONES DEBAJO, CENTRADO -->
    <div class="import-container q-mt-xl" style="margin: 0 auto">
      <div class="text-h6 q-mb-md">Ingresar datos Publicaciones</div>
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
      <div
        v-if="fileImported && excelPreview.length"
        class="q-mt-lg"
        style="max-width: 1200px; margin: 0 auto"
      >
        <q-card>
          <q-card-section>
            <div class="text-subtitle2 q-mb-sm">Vista previa del archivo</div>
            <!-- Scroll horizontal y vertical SOLO en la tabla -->
            <div style="width: 100%; overflow-x: auto">
              <div
                style="
                  min-width: 600px;
                  max-width: 1100px;
                  max-height: 350px;
                  height: 350px;
                  overflow: auto;
                  margin: 0 auto;
                "
              >
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
          <q-btn color="secondary" label="Insertar" @click="insertarListaCerrada" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import * as XLSX from 'xlsx'
import { api } from 'boot/axios'

const user = ref(JSON.parse(localStorage.getItem('user')) || {})
const router = useRouter()

// ==================== CONTAINER 1: PROFESORES (TEST) ====================
const fileInput = ref(null)
const fileImported = ref(false)
const excelPreview = ref([])
const excelColumns = ref([])

function openFile() {
  fileInput.value && fileInput.value.click()
}

function onFileChange(e) {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (evt) => {
    const data = evt.target.result
    const workbook = XLSX.read(data, { type: 'array' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const json = XLSX.utils.sheet_to_json(worksheet, { defval: '' })
    if (json.length) {
      // Normaliza los nombres de las columnas
      const normalized = json.map((row) => ({
        ...row,
        ISSN: row.ISSN || row.Issn || row['issn'] || '',
        ISSN2: row.ISSN2 || row.Issn2 || row['issn2'] || '',
        ISSN3: row.ISSN3 || row.Issn3 || row['issn3'] || '',
        ABDC: row.ABDC || row.abdc || row['Abdc'] || '', // Normaliza ABDC también
      }))
      excelColumns.value = Object.keys(normalized[0]).map((key) => ({
        name: key,
        label: key,
        field: key,
        align: 'left',
      }))
      excelPreview.value = normalized
      fileImported.value = true
    }
  }
  reader.readAsArrayBuffer(file)
}

// Importar registros al backend
const insertarListaCerrada = async () => {
  try {
    await api.post('/api/ListasCerradas/importar', excelPreview.value)
    // Notifica éxito
    alert('Registros insertados correctamente.')
  } catch (error) {
    console.error(error)
    alert('Error al insertar registros.')
  }
}

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
  padding: 3.5rem 2rem 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.dashboard-card {
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
  border-radius: 14px;
  box-shadow: 0 2px 12px 0 rgba(44, 62, 80, 0.08);
  background: #fafafa;
}
.text-h4 {
  font-size: 2.2rem;
  font-weight: 700;
  color: #d32f2f;
}
.text-h6 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #222;
}
.text-bold {
  font-weight: 700;
}
</style>
