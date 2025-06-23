<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Bienvenido, {{ user.Nombre }} {{ user.Apellido }}</div>
    <div class="text-subtitle1">Rol: {{ user.NombreRol }}</div>

    <q-separator class="q-my-md" />

    <div v-if="user.RolId === 1">
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-subtitle2">📚 Leídos recientemente</div>
        </q-card-section>
        <q-list>
          <q-item v-for="pub in publicaciones" :key="pub.PublicacionID">
            <q-item-section>{{ pub.Nombre }}</q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>

    <div v-else-if="user.RolId === 4">
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-subtitle2">⚙️ Panel de gestión</div>
        </q-card-section>
        <q-card-actions vertical>
          <q-btn label="Usuarios" to="/admin/usuarios" color="primary" flat />
          <q-btn label="Categorías" to="/admin/categorias" color="primary" flat />
          <q-btn label="Publicaciones" to="/admin/publicaciones" color="primary" flat />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'

const user = ref(JSON.parse(localStorage.getItem('user')) || {})
const publicaciones = ref([])

onMounted(async () => {
  if (user.value?.UsuarioId) {
    try {
      const res = await api.get(`/api/publicaciones/recientes/${user.value.UsuarioId}`)
      publicaciones.value = res.data
    } catch (err) {
      console.error('Error cargando publicaciones:', err)
    }
  }
})
</script>
