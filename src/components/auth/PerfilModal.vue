<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <button class="close-btn" @click="close">×</button>
      <h2>Mi Perfil</h2>
      <div class="modal-row"><b>Nombre:</b> {{ usuario.nombre }}</div>
      <div class="modal-row"><b>Apellido:</b> {{ usuario.apellido }}</div>
      <div class="modal-row"><b>Correo:</b> {{ usuario.correo }}</div>
      <div class="modal-row"><b>Rol:</b> {{ getRoleName(usuario.rolId) }}</div>
      <div class="modal-row">
        <b>Estado:</b>
        <span :class="usuario.estado === 1 ? 'activo' : 'inactivo'">{{
          usuario.estado === 1 ? 'Activo' : 'Inactivo'
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, onMounted, watch } from 'vue'

const props = defineProps({
  show: Boolean,
})
const emit = defineEmits(['close'])

const usuario = ref({ nombre: '', apellido: '', correo: '', rolId: null, estado: 1 })

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

function close() {
  emit('close')
}

function cargarUsuario() {
  const userData = JSON.parse(localStorage.getItem('user')) || {}
  usuario.value.nombre = userData.nombre || ''
  usuario.value.apellido = userData.apellido || ''
  usuario.value.correo = userData.email || userData.correo || ''
  usuario.value.rolId = userData.rolId || userData.rol || ''
  // Estado puede venir como boolean, string o número
  let estado = userData.estado
  if (typeof estado === 'string') {
    estado = estado.trim().toLowerCase()
    usuario.value.estado = estado === 'activo' || estado === '1' || estado === 'true' ? 1 : 0
  } else if (typeof estado === 'boolean') {
    usuario.value.estado = estado ? 1 : 0
  } else if (typeof estado === 'number') {
    usuario.value.estado = estado === 1 ? 1 : 0
  } else {
    usuario.value.estado = 1 // Por defecto activo
  }
}

onMounted(() => {
  if (props.show) cargarUsuario()
})

watch(
  () => props.show,
  (val) => {
    if (val) cargarUsuario()
  },
)
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.modal-content {
  background: #fff;
  border-radius: 8px;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  min-width: 320px;
  max-width: 90vw;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
  position: relative;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
.modal-row {
  margin-bottom: 0.7rem;
}
.activo {
  color: #21ba45;
}
.inactivo {
  color: #c10015;
}
</style>
