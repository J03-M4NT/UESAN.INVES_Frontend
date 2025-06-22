<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-title">
        <span class="accent-bar"></span>
        <h2>Bienvenido</h2>
      </div>
      <form class="login-form" @submit.prevent="login">
        <label class="login-label">Ingresa tus datos:</label>
        <div class="q-mb-md">
          <input
            v-model="codigo"
            type="text"
            placeholder="Código Institucional"
            class="login-input-native"
            required
          />
        </div>
        <div class="q-mb-md">
          <input
            v-model="password"
            type="password"
            placeholder="Contraseña"
            class="login-input-native"
            required
          />
        </div>
        <div class="forgot-password">
          <a href="#">¿Has olvidado tu contraseña?</a>
        </div>
        <button type="submit" class="login-btn">Ingresar</button>
        <div class="register-link">
          <a href="#" @click.prevent="goToRegister">Crear cuenta</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const codigo = ref('')
const password = ref('')
const router = useRouter()

function login() {
  // Lógica de autenticación aquí
  // alert('Login con: ' + codigo.value + ' / ' + password.value)
}

function goToRegister() {
  router.push('/register')
}
</script>

<!-- TODO: Arreglar imagen para que se vea y revisar codigo que funcione el login -->

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* Fondo mitad gris, mitad imagen */
  background:
    linear-gradient(to right, #b2b2b2 50%, transparent 50%), url('../../assets/gente_img.png');
  background-size:
    60% 100%,
    cover;
  background-position: left, right;
  background-repeat: no-repeat, no-repeat;
}
.login-card {
  background: linear-gradient(to bottom, #23232b, transparent 100%);
  color: #fff;
  border-radius: 32px;
  padding: 2.5rem 2rem 2rem 2rem;
  margin: 3rem 0 3rem 3rem;
  min-width: 350px;
  max-width: 370px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  display: flex;
  flex-direction: column;
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
  background: #ffffff;
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
</style>
