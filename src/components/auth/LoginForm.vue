<template>
  <div class="login-main-row">
    <!-- Panel izquierdo - Login -->
    <div class="login-container">
      <div class="login-card">
        <div class="login-logo">
          <img :src="logoVdi" alt="Logo" class="logo-img" />
        </div>
        <div class="login-title">
          <span class="accent-bar"></span>
          <h2>Bienvenido!</h2>
        </div>
        <form class="login-form" @submit.prevent="onSubmit">
          <label class="login-label">Ingresa tus datos:</label>
          <div class="q-mb-md">
            <input
              v-model="codigo"
              type="text"
              placeholder="Correo Electrónico"
              class="login-input-native"
              required
            />
          </div>
          <div class="q-mb-md password-wrapper">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Contraseña"
              class="login-input-native"
              required
            />
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
          </div>
          <div class="forgot-password">
            <a href="#">¿Has olvidado tu contraseña?</a>
          </div>
          <button type="submit" class="login-btn" :disabled="loading">Ingresar</button>
          <div class="register-link">
            <a href="#" @click.prevent="goToRegister">Crear cuenta</a>
          </div>
        </form>
      </div>
    </div>
    <!-- Panel derecho - Bienvenida con imagen -->
    <div class="welcome-panel">
      <div class="text-white text-center q-pa-md absolute-center welcome-title">
        <div class="text-h3 q-mb-md">Investigación ESAN</div>
        <div class="text-h5">La curiosidad es la chispa que enciende el conocimiento.</div>
        <div class="text-subtitle1 q-mt-md">
          Pregunta, indaga y expande los límites de lo posible.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import logoVdi from 'src/assets/Logo_VDI-02.webp'

const router = useRouter()
const $q = useQuasar()

const loading = ref(false)
const codigo = ref('')
const password = ref('')
const showPassword = ref(false)

const onSubmit = async () => {
  loading.value = true
  try {
    const response = await api.post('/api/usuarios/signin', {
      correo: codigo.value,
      contraseña: password.value,
    })

    // Guardar datos del usuario y token
    localStorage.setItem('user', JSON.stringify(response.data))
    localStorage.setItem('token', response.data.token)

    // Mostrar mensaje de éxito
    $q.notify({
      type: 'positive',
      message: 'Inicio de sesión exitoso',
    })

    // Redireccionar según el rol
    if (response.data.rolId === 4) {
      router.push('/admin/dashboard')
    } else {
      router.push('/')
    }
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.response?.data?.message || 'Error al iniciar sesión',
    })
  } finally {
    loading.value = false
  }
}

function goToRegister() {
  router.push('/register')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');
.login-main-row {
  display: flex;
  min-height: 100vh;
}
.login-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background: linear-gradient(135deg, #740200 0%, #7c3c3c 50%, #c54343 100%);
  width: 45vw; /*margen del panel izquierdo de fondo*/
}
.login-card {
  background: linear-gradient(to bottom, #23232b, transparent 100%);
  color: #fff;
  border-radius: 0 64px 64px 0;
  padding: 1.5rem 1.2rem 1.2rem 1.2rem; /* menos padding */
  margin: 2rem 0; /* menos margen */
  min-width: 340px; /* más pequeño */
  max-width: 400px; /* más pequeño */
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  display: flex;
  flex-direction: column;
  position: relative;
}
.login-logo {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}
.logo-img {
  max-width: 350px; /* más pequeño para que encaje mejor */
  height: auto;
  filter: none; /* quitar filtro para que el rojo sea más vivo */
}
.login-title {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}
.login-title h2 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0 0.5rem;
}
.accent-bar {
  width: 5px;
  height: 2.2rem;
  background: #d32f2f;
  border-radius: 2px;
  margin-right: 0.7rem;
}
.login-label {
  font-size: 1.1rem;
  margin-bottom: 0.7rem;
  display: block;
}
.login-input-native {
  width: 100%;
  padding: 0.7rem 1rem;
  border-radius: 12px;
  border: 1px solid #bdbdbd;
  background: #fff;
  color: #242424;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  outline: none;
  transition: border 0.2s;
}
.login-input-native:focus {
  border: 1.5px solid #d32f2f;
}
.forgot-password {
  text-align: right;
  margin-bottom: 1.2rem;
}
.forgot-password a {
  color: #fff;
  font-size: 0.95rem;
  opacity: 0.8;
  text-decoration: underline;
}
.login-btn {
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
.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.login-btn:hover {
  background: #b71c1c;
}
.register-link {
  text-align: center;
  margin-top: 0.5rem;
}
.register-link a {
  color: #fff;
  opacity: 0.8;
  text-decoration: underline;
  font-size: 0.98rem;
}
.q-mb-md.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.toggle-password-btn {
  position: absolute;
  right: 12px;
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
.welcome-panel {
  position: relative;
  background-image: url('src/assets/img.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  overflow: hidden;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.welcome-panel::before {
  content: ''; /* Panel derecho colores con img.png */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%);
  z-index: 1;
}
.absolute-center {
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.welcome-title {
  font-family: 'Montserrat', Arial, sans-serif !important;
}
@media (max-width: 900px) {
  .login-main-row {
    flex-direction: column;
  }
  .login-container,
  .welcome-panel {
    width: 100vw;
    min-height: 50vh;
    border-radius: 0;
  }
  .login-card {
    min-width: 90vw;
    max-width: 98vw;
    border-radius: 0 32px 32px 0;
    padding: 1.2rem 0.5rem 1rem 0.5rem; /* menos padding en mobile */
  }
  .logo-img {
    max-width: 120px;
  }
}
</style>

<!-- TODO: Revisar tema de conexion al backend para la base de datos con las cuentas -->
