<template>
  <div class="q-pa-md flex flex-center" style="min-height: 100vh">
    <div style="max-width: 400px; width: 100%">
      <div class="text-h5 text-center q-mb-md">Iniciar Sesión</div>
      <q-form class="q-gutter-md">
        <q-input
          filled
          v-model="correo"
          label="Correo *"
          type="email"
          hint="Ingresa tu correo"
          lazy-rules
          :rules="[(val) => !!val || 'Por favor ingresa tu correo']"
        />

        <q-input
          filled
          v-model="contraseña"
          label="Contraseña *"
          type="password"
          hint="Ingresa tu contraseña"
          lazy-rules
          :rules="[(val) => !!val || 'Por favor ingresa tu contraseña']"
        />

        <q-toggle v-model="accept" label="Acepto los términos y condiciones" />

        <div class="row items-center q-gutter-sm">
          <q-btn label="Iniciar sesión" @click="iniciarSesion" color="primary" />
          <q-btn label="Cancelar" @click="onReset" color="primary" flat />
        </div>
        <div class="q-mt-md">
          <q-btn
            flat
            label="¿No tienes cuenta? Regístrate"
            color="secondary"
            @click="redirigirRegistro"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

const $q = useQuasar()
const router = useRouter()

const correo = ref('')
const contraseña = ref('')
const accept = ref(false)

const iniciarSesion = async () => {
  if (!accept.value) {
    $q.notify({ type: 'negative', message: 'Debes aceptar los términos y condiciones.' })
    return
  }

  const user = {
    correo: correo.value,
    contraseña: contraseña.value,
  }

  try {
    const response = await api.post('/api/usuarios/signin', user)

    // ✅ Guardamos el objeto completo (incluye nombre, rol, token, etc.)
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data))

    $q.notify({ type: 'positive', message: 'Inicio de sesión exitoso.' })
    router.push('/') // Redirigir a la página principal después del login
  } catch (error) {
    if (error.response?.status === 401) {
      $q.notify({ type: 'negative', message: 'Correo o contraseña incorrectos.' })
    } else {
      $q.notify({ type: 'negative', message: 'Error al iniciar sesión.' })
    }
  }
}

const onReset = () => {
  correo.value = ''
  contraseña.value = ''
  accept.value = false
}

const redirigirRegistro = () => {
  router.push('/register')
}
</script>
