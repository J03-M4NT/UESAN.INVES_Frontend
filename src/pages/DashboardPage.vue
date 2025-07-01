<!-- TODO: PANEL PARA ADMINISTRADOR -->

<template>
  <q-page class="q-pa-md flex flex-center">
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
          <q-btn label="Usuarios" color="primary" flat />
          <q-btn label="Categorías" color="primary" flat />
          <q-btn label="Publicaciones" color="primary" flat />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref(JSON.parse(localStorage.getItem('user')) || {})

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
</style>
