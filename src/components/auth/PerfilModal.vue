<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content formal-modal">
      <button class="close-btn" @click="close" aria-label="Cerrar">×</button>
      <div class="modal-header">
        <img src="/public/usuario.png" alt="Logo" class="modal-logo" />
        <div class="modal-title">Mi Perfil</div>
      </div>
      <div class="modal-body">
        <div class="modal-row">
          <span class="modal-label">Nombre:</span>
          <span class="modal-value">{{ usuario.nombre }}</span>
        </div>
        <div class="modal-row">
          <span class="modal-label">Apellido:</span>
          <span class="modal-value">{{ usuario.apellido }}</span>
        </div>
        <div class="modal-row">
          <span class="modal-label">Correo:</span>
          <span class="modal-value">{{ usuario.correo }}</span>
        </div>
        <div class="modal-row">
          <span class="modal-label">Rol:</span>
          <span class="modal-value">{{ getRoleName(usuario.rolId) }}</span>
        </div>
        <div class="modal-row">
          <span class="modal-label">Estado:</span>
          <span class="modal-value" :class="usuario.estado === 1 ? 'activo' : 'inactivo'">
            {{ usuario.estado === 1 ? 'Activo' : 'Inactivo' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

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
/* Fondo del modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

/* Contenido del modal */
.formal-modal {
  background: #f8f8fa;
  border-radius: 14px;
  padding: 2.2rem 2.2rem 2rem 2.2rem;
  min-width: 340px;
  max-width: 95vw;
  box-shadow: 0 4px 32px rgba(44, 62, 80, 0.18);
  position: relative;
  font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
  color: #2d2d2d;
  border: 1.5px solid #d32f2f22;
}

.modal-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
}
.modal-logo {
  width: 38px;
  height: 38px;
  margin-right: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.08);
}
.modal-title {
  font-size: 1.45rem;
  font-weight: 600;
  color: #b71c1c;
  letter-spacing: 0.5px;
}
.close-btn {
  position: absolute;
  top: 18px;
  right: 18px;
  background: none;
  border: none;
  font-size: 1.7rem;
  color: #b71c1c;
  cursor: pointer;
  transition: color 0.2s;
}
.close-btn:hover {
  color: #d32f2f;
}
.modal-body {
  margin-top: 0.5rem;
}
.modal-row {
  display: flex;
  align-items: center;
  margin-bottom: 1.1rem;
}
.modal-label {
  min-width: 90px;
  font-weight: 500;
  color: #b71c1c;
  font-size: 1.05rem;
  letter-spacing: 0.2px;
}
.modal-value {
  margin-left: 0.7rem;
  font-size: 1.08rem;
  color: #222;
  font-weight: 400;
}
.activo {
  color: #21ba45;
  font-weight: 600;
}
.inactivo {
  color: #c10015;
  font-weight: 600;
}
</style>
