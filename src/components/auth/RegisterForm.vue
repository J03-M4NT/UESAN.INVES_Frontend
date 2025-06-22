<template>
  <div class="register-bg">
    <div class="register-card">
      <div class="text-h5 text-center q-mb-md register-title">Registro de Usuario</div>
      <q-form @submit.prevent="registrarUsuario" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="form.FirstName"
          label="Nombre *"
          :rules="[(val) => !!val || 'Campo requerido']"
        />
        <q-input
          filled
          v-model="form.LastName"
          label="Apellido *"
          :rules="[(val) => !!val || 'Campo requerido']"
        />
        <q-input
          filled
          v-model="form.Email"
          label="Email *"
          type="email"
          :rules="[(val) => !!val || 'Campo requerido']"
        />
        <q-input
          filled
          v-model="form.Country"
          label="País *"
          :rules="[(val) => !!val || 'Campo requerido']"
        />
        <q-input
          filled
          v-model="form.Address"
          label="Dirección *"
          :rules="[(val) => !!val || 'Campo requerido']"
        />
        <q-input
          filled
          v-model="form.Password"
          label="Contraseña *"
          type="password"
          :rules="[(val) => !!val || 'Campo requerido']"
        />
        <q-input
          filled
          v-model="repeatPassword"
          label="Repetir Contraseña *"
          type="password"
          :rules="[(val) => val === form.Password || 'Las contraseñas no coinciden']"
        />
        <div class="row items-center q-gutter-sm">
          <q-btn label="Registrarse" type="submit" color="primary" />
          <q-btn label="Cancelar" type="reset" color="primary" flat />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      form: {
        FirstName: '',
        LastName: '',
        Email: '',
        Country: '',
        Address: '',
        Password: '',
        Type: 'U',
      },
      repeatPassword: '',
    }
  },
  methods: {
    registrarUsuario() {
      if (this.form.Password !== this.repeatPassword) {
        this.$q.notify({ type: 'negative', message: 'Las contraseñas no coinciden.' })
        return
      }
      try {
        this.$api
          .post('api/users', this.form)
          .then((response) => {
            console.log('Usuario registrado:', response.data)
            this.$router.push('/login')
          })
          .catch((error) => {
            console.error('Error al registrar usuario:', error)
            this.$q.notify({ type: 'negative', message: 'Error al registrar usuario.' })
          })
      } catch (e) {
        console.error('Error al registrar usuario:', e)
        this.$q.notify({ type: 'negative', message: 'Error al registrar usuario.' })
      }
    },
    onReset() {
      this.form = {
        FirstName: '',
        LastName: '',
        Email: '',
        Country: '',
        Address: '',
        Password: '',
        Type: 'U',
      }
      this.repeatPassword = ''
    },
  },
}
</script>

<!-- TODO: Arreglar tamaño del form, mejorar colores y conexion directa a la pagina de inicio -->
<style scoped>
.register-bg {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%);
}
.register-card {
  background: #8f8f9a;
  color: #fff;
  border-radius: 32px;
  padding: 2.5rem 2rem 2rem 2rem;
  margin: 2rem 0;
  min-width: 350px;
  max-width: 500px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  display: flex;
  flex-direction: column;
}
.text-h5,
.register-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #fff;
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
</style>
