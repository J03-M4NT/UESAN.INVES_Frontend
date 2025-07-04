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
            option-label="NombreRol"
            option-value="RolID"
            label="Selecciona un rol"
            @update:model-value="onRolChange"
          />
        </div>

        <!-- Tabla de usuarios -->
        <q-table :rows="usuarios" :columns="columns" row-key="UsuarioID" flat bordered />
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
  { name: 'apellido', label: 'Apellido', field: 'apellido', align: 'left' },
  { name: 'correo', label: 'Correo', field: 'correo', align: 'left' },
  { name: 'rol', label: 'Rol', field: 'rol', align: 'left' },
]

function getRoleName(rolID) {
  const mapa = {
    1: 'Estudiante',
    2: 'Profesor',
    3: 'Personal externo',
    4: 'Administrador',
  }
  return mapa[rolID] || 'Desconocido'
}

async function cargarUsuarios() {
  const data = await obtenerUsuariosPorRol(selectedRol.value)
  usuarios.value = data.map((u) => ({
    ...u,
    rol: getRoleName(u.RolID),
  }))
}

async function cargarRoles() {
  const rolesBackend = await obtenerRoles()
  roles.value = [
    { RolID: '', NombreRol: 'Todos los roles' },
    ...rolesBackend.map((r) => ({
      RolID: r.RolID,
      NombreRol: r.NombreRol,
    })),
  ]
}

function onRolChange() {
  cargarUsuarios()
}

onMounted(() => {
  cargarRoles()
  cargarUsuarios()
})
</script>
