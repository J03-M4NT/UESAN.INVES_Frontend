<template>
  <div class="q-pa-md flex flex-center" style="min-height: 100vh">
    <div style="max-width: 500px; width: 100%">
      <div class="text-h5 text-center q-mb-md">Registro de Usuario</div>
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
          type="password"
          :rules="[(val) => !!val || 'Campo requerido']"
        />
        <q-input
          filled
          v-model="repeatPassword"
          label="Repetir Contraseña *"
          type="password"
          :rules="[(val) => val === form.Contraseña || 'Las contraseñas no coinciden']"
        />
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
          <q-btn label="REGISTRARSE" type="submit" color="primary" />
          <q-btn label="CANCELAR" @click="cancelarRegistro" color="primary" flat />
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
