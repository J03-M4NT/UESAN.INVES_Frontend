<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">Filtrado por Roles de Usuarios</div>

        <!-- Filtro por rol -->
        <div class="q-mb-md">
          <q-select
            v-model="selectedRol"
            :options="roles"
            option-label="nombre"
            option-value="id"
            label="Selecciona un rol"
            @change="onRolChange"
          />
        </div>

        <!-- Tabla de usuarios -->
        <q-table :rows="usuarios" :columns="columns" row-key="id" flat bordered />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { obtenerUsuariosPorRol, obtenerRoles } from '../services/UsuariosService'

const usuarios = ref([])
const roles = ref([])
const selectedRol = ref('')
const columns = [
  { name: 'nombre', label: 'Nombre', field: 'nombre', align: 'left' },
  { name: 'rol', label: 'Rol', field: (row) => getRoleName(row.rolId), align: 'left' },
]

function getRoleName(rolId) {
  switch (Number(rolId)) {
    case 1:
      return 'Estudiante'
    case 2:
      return 'Profesor'
    case 3:
      return 'Personal externo'
    case 4:
      return 'Administrador'
    default:
      return 'Desconocido'
  }
}

async function cargarUsuarios() {
  usuarios.value = await obtenerUsuariosPorRol(selectedRol.value)
  // Si los usuarios vienen con 'rolId', mapea el nombre del rol
  usuarios.value = usuarios.value.map((u) => ({ ...u, rol: getRoleName(u.rolId) }))
}

async function cargarRoles() {
  roles.value = await obtenerRoles()
}

onMounted(() => {
  cargarRoles()
  cargarUsuarios()
})

function onRolChange() {
  cargarUsuarios()
}
</script>
