<template>
  <q-page padding>
    <div class="q-mb-xl">
      <h2 class="text-h5">Gestión de Profesores</h2>
      <q-table
        :rows="profesores"
        :columns="columns"
        row-key="usuarioId"
        flat
        bordered
        class="q-mt-md"
      >
        <template #body-cell-estado="props">
          <q-td>
            <q-select
              v-model="props.row.estado"
              :options="['Activo', 'No Activo']"
              dense
              emit-value
              map-options
              @update:model-value="cambiarEstado(props.row)"
            />
          </q-td>
        </template>
      </q-table>
    </div>

    <q-separator spaced />

    <div class="q-mt-xl">
      <h3 class="text-h6 q-mb-md">Registrar nuevo profesor</h3>
      <q-form @submit.prevent="registrarProfesor">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-4">
            <q-input v-model="nuevo.nombre" label="Nombre" filled required />
          </div>
          <div class="col-12 col-md-4">
            <q-input v-model="nuevo.apellido" label="Apellido" filled required />
          </div>
          <div class="col-12 col-md-4">
            <q-input v-model="nuevo.correo" label="Correo" filled type="email" required />
          </div>
          <div class="col-12 col-md-4">
            <q-input
              v-model="nuevo.contrasena"
              label="Contraseña"
              filled
              type="password"
              required
            />
          </div>
        </div>
        <div class="q-mt-md">
          <q-btn label="Registrar" color="primary" type="submit" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import { Notify } from 'quasar'

const profesores = ref([])
const columns = [
  { name: 'nombre', label: 'Nombre', field: 'nombre', align: 'left' },
  { name: 'apellido', label: 'Apellido', field: 'apellido', align: 'left' },
  { name: 'correo', label: 'Correo', field: 'correo', align: 'left' },
  { name: 'contrasena', label: 'Contraseña', field: 'contrasena', align: 'left' },
  {
    name: 'estado',
    label: 'Estado',
    field: (row) => (row.estado === true || row.estado === 'Activo' ? 'Activo' : 'No Activo'),
    align: 'center',
  },
]

const nuevo = ref({
  nombre: '',
  apellido: '',
  correo: '',
  contrasena: '',
})

const cargarProfesores = async () => {
  try {
    // Ajusta el endpoint según tu backend
    const res = await api.get('/api/Usuarios?rol=profesor')
    profesores.value = res.data
  } catch {
    Notify.create({ type: 'negative', message: 'Error cargando profesores' })
  }
}

const cambiarEstado = async (profesor) => {
  try {
    // Convertir el valor visual a booleano para el backend
    let nuevoEstado = profesor.estado === 'Activo' || profesor.estado === true
    // Actualizar el usuario completo (ajusta si tu backend requiere todos los campos)
    const payload = {
      ...profesor,
      estado: nuevoEstado,
    }
    await api.put(`/api/Usuarios/${profesor.usuarioId}`, payload)
    Notify.create({ type: 'positive', message: 'Estado actualizado' })
    cargarProfesores()
  } catch {
    Notify.create({ type: 'negative', message: 'Error actualizando estado' })
  }
}

const registrarProfesor = async () => {
  try {
    // Construir el objeto igual que en RegisterForm.vue
    const payload = {
      Nombre: nuevo.value.nombre,
      Apellido: nuevo.value.apellido,
      Correo: nuevo.value.correo,
      Contraseña: nuevo.value.contrasena,
      RolId: 2, // ID de profesor
      Estado: true,
      FechaRegistro: new Date().toISOString(),
    }
    await api.post('/api/usuarios', payload)
    Notify.create({ type: 'positive', message: 'Profesor registrado' })
    cargarProfesores()
    Object.assign(nuevo.value, { nombre: '', apellido: '', correo: '', contrasena: '' })
  } catch {
    Notify.create({ type: 'negative', message: 'Error registrando profesor' })
  }
}

onMounted(() => {
  cargarProfesores()
})
</script>
