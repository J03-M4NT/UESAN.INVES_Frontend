<template>
  <div class="register-bg">
    <div class="register-card">
      <div class="text-h5 text-center q-mb-md register-title">Registro de Usuario:</div>
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

        <!-- Contraseña -->
        <q-input
          filled
          v-model="form.Password"
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

        <!-- Repetir Contraseña -->
        <q-input
          filled
          v-model="repeatPassword"
          label="Repetir Contraseña *"
          :type="showRepeatPassword ? 'text' : 'password'"
          :rules="[(val) => val === form.Password || 'Las contraseñas no coinciden']"
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
      showPassword: false,
      repeatPassword: '',
      showRepeatPassword: false,
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
  background:
    linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(60, 60, 60, 0.7)),
    url('https://www.esan.edu.pe/images/blog/20230512/jHG2JL.png') center center/cover no-repeat;
  filter: grayscale(1);
}
.register-card {
  background: rgba(30, 30, 30, 0.65); /* fondo oscuro translúcido */
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
  backdrop-filter: blur(6px); /* efecto glassmorphism */
}
.text-h5,
.register-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #fff;
  text-align: center;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5); /* mejor legibilidad */
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
  background: rgba(24, 24, 31, 0.85) !important;
  border-radius: 12px !important;
  border: 1.5px solid #fff !important;
}
.q-input input {
  color: #fff !important;
  border: none !important;
}
.q-input__label,
.q-field__label,
.q-field__append,
.q-field__prepend,
.q-icon,
.q-field__control .q-icon {
  color: #fff !important;
  fill: #fff !important;
}
.q-input input:focus,
.q-field--focused .q-field__control {
  border: 2px solid #fff !important;
  box-shadow: 0 0 0 1.5px #fff !important;
}
.q-btn,
.q-btn[type='reset'],
.q-btn--flat,
.q-btn--standard {
  width: 100%;
  background: #d32f2f !important;
  color: #fff !important;
  font-weight: 600;
  border-radius: 20px;
  margin-bottom: 0.7rem;
  padding: 0.7rem 0;
  border: none !important;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.q-btn:hover,
.q-btn[type='reset']:hover,
.q-btn--flat:hover,
.q-btn--standard:hover {
  background: #b71c1c !important;
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
</style>
