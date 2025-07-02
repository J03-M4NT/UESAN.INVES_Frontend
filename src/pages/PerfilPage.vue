<template>
  <q-page padding>
    <q-card class="q-pa-lg shadow-2">
      <q-card-section>
        <div class="text-h5">Mi Perfil</div>
        <q-separator class="q-my-md" />

        <q-list bordered class="rounded-borders">
          <q-item>
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Nombre</q-item-label>
              <q-item-label caption>{{ usuario.nombre }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon name="email" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Correo</q-item-label>
              <q-item-label caption>{{ usuario.correo }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon name="badge" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Rol</q-item-label>
              <q-item-label caption>{{ getRoleName(usuario.rolId) }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Editar perfil" color="primary" flat @click="editarPerfil" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const usuario = ref({ nombre: '', correo: '', rolId: null })

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

onMounted(() => {
  const userData = JSON.parse(localStorage.getItem('user')) || {}
  usuario.value.nombre = userData.nombre || ''
  usuario.value.correo = userData.email || userData.correo || ''
  usuario.value.rolId = userData.rolId || userData.rol || ''
})
</script>

<style scoped></style>
