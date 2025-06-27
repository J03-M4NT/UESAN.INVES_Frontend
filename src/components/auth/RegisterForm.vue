<template>
  <div
    class="register-bg"
    :style="{
      background: `linear-gradient(135deg, rgba(40,40,60,0.55) 0%, rgba(60,60,80,0.55) 100%), url(${bgRegister}) center center/cover no-repeat`,
    }"
  >
    <div class="register-card">
      <div class="text-h5 text-center q-mb-md register-title">Registra tu cuenta</div>
      <q-form @submit.prevent="registrarUsuario" class="q-gutter-md">
        <q-input
          filled
          v-model="form.Nombre"
          label="Nombre *"
          :rules="[(val) => !!val || 'Campo requerido']"
        />
        <q-input
          filled
          v-model="form.Apellido"
          label="Apellido *"
          :rules="[(val) => !!val || 'Campo requerido']"
        />
        <q-input
          filled
          v-model="form.Correo"
          label="Correo *"
          type="email"
          :rules="[(val) => !!val || 'Campo requerido']"
        />
        <q-input
          filled
          v-model="form.Contraseña"
          label="Contraseña *"
          :type="showPassword ? 'text' : 'password'"
          :rules="[(val) => !!val || 'Campo requerido']"
        >
          <template #append>
            <button
              type="button"
              class="toggle-password-btn"
              @click="showPassword = !showPassword"
              :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
              tabindex="-1"
            >
              <span v-if="showPassword">
                <!-- Ojo abierto SVG -->
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#bdbdbd"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </span>
              <span v-else>
                <!-- Ojo cerrado SVG -->
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#bdbdbd"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.77 21.77 0 0 1 5.06-6.06"
                  />
                  <path d="M1 1l22 22" />
                  <path d="M9.53 9.53A3 3 0 0 0 12 15a3 3 0 0 0 2.47-5.47" />
                  <path d="M14.47 14.47A3 3 0 0 1 12 9a3 3 0 0 1-2.47 5.47" />
                </svg>
              </span>
            </button>
          </template>
        </q-input>
        <q-input
          filled
          v-model="repeatPassword"
          label="Repetir Contraseña *"
          :type="showRepeatPassword ? 'text' : 'password'"
          :rules="[(val) => val === form.Contraseña || 'Las contraseñas no coinciden']"
        >
          <template #append>
            <button
              type="button"
              class="toggle-password-btn"
              @click="showRepeatPassword = !showRepeatPassword"
              :aria-label="showRepeatPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
              tabindex="-1"
            >
              <span v-if="showRepeatPassword">
                <!-- Ojo abierto SVG -->
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#bdbdbd"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </span>
              <span v-else>
                <!-- Ojo cerrado SVG -->
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#bdbdbd"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.77 21.77 0 0 1 5.06-6.06"
                  />
                  <path d="M1 1l22 22" />
                  <path d="M9.53 9.53A3 3 0 0 0 12 15a3 3 0 0 0 2.47-5.47" />
                  <path d="M14.47 14.47A3 3 0 0 1 12 9a3 3 0 0 1-2.47 5.47" />
                </svg>
              </span>
            </button>
          </template>
        </q-input>
        <q-select
          filled
          v-model="form.RolId"
          label="Rol *"
          :options="roles"
          option-label="label"
          option-value="value"
          emit-value
          map-options
          :rules="[(val) => !!val || 'Campo requerido']"
        />
        <q-toggle v-model="form.Estado" label="Activo" />
        <div class="row items-center q-gutter-sm">
          <q-btn label="Registrarse" type="submit" color="primary" />
          <q-btn label="Cancelar" type="reset" color="primary" flat @click="cancelarRegistro" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import bgRegister from 'src/assets/esan_noche.jpg'

const $q = useQuasar()
const router = useRouter()

const form = reactive({
  Nombre: '',
  Apellido: '',
  Correo: '',
  Contraseña: '',
  RolId: null,
  Estado: true,
})

const repeatPassword = ref('')
const showPassword = ref(false)
const showRepeatPassword = ref(false)

const roles = [
  { label: 'Estudiante', value: 1 },
  { label: 'Profesor', value: 2 },
  { label: 'Personal Externo', value: 3 },
  { label: 'Administrador', value: 4 },
]

const registrarUsuario = async () => {
  if (form.Contraseña !== repeatPassword.value) {
    $q.notify({ type: 'negative', message: 'Las contraseñas no coinciden.' })
    return
  }

  try {
    await api.post('/api/usuarios', form)
    $q.notify({ type: 'positive', message: 'Registro exitoso.' })
    router.push('/login')
  } catch (error) {
    console.error(error)
    $q.notify({ type: 'negative', message: 'Error al registrar.' })
  }
}

const cancelarRegistro = () => {
  router.push('/login')
}
</script>

<!-- TODO: Arreglar tamaño del form, mejorar colores y conexion directa a la pagina de inicio -->
<style scoped>
.register-bg {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* El fondo se asigna dinámicamente desde el atributo :style */
}
.register-card {
  background: rgba(60, 60, 80, 0.496); /* Más oscuro y translúcido */
  color: #fff;
  border-radius: 32px;
  padding: 2.5rem 2rem 2rem 2rem;
  margin: 2rem 0;
  min-width: 350px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  display: flex;
  flex-direction: column;
  /* Efecto de desenfoque para mayor modernidad */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1.5px solid rgba(255, 255, 255, 0.18); /* Borde sutil */
}
.text-h5,
.register-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #ffffff;
  text-align: center;
}
.q-form {
  width: 100%;
}
.q-input {
  margin-bottom: 1rem;
}
.q-input input,
.q-input__control,
.q-field__control {
  background: #18181f !important;
  color: #fff !important;
  border-radius: 12px !important;
  border: 1px solid #bdbdbd !important;
  font-size: 1rem;
}
.q-input input:focus {
  border: 1.5px solid #d32f2f !important;
}
.q-btn {
  width: 100%;
  background: #d32f2f;
  color: #fff;
  font-weight: 600;
  border-radius: 20px;
  margin-bottom: 0.7rem;
  padding: 0.7rem 0;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.q-btn[type='reset'] {
  background: transparent;
  color: #fff;
  border: 1px solid #fff;
}
.q-btn:hover {
  background: #b71c1c;
}

/* Ocultar/Mostrar Contraseña */
.toggle-password-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  color: #bdbdbd;
  padding: 0;
  height: 100%;
  display: flex;
  align-items: center;
}
.toggle-password-btn:focus {
  outline: none;
}
/* -------------------------- */

/* Color de las palabras que estan dentro de los cuadros de nombre, apellidos, etc */
:deep(.q-field__label) {
  color: #c3c3c3 !important;
  opacity: 1 !important;
}
/* -------------------------- */
</style>
