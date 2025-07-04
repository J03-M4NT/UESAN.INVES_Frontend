<template>
  <q-page padding>
    <div class="q-mx-auto" style="max-width: 600px">
      <div class="text-h5 q-mb-lg">Ingresar información:</div>
      <q-form @submit.prevent="enviarPropuesta">
        <q-input filled v-model="tema" label="Tema" class="q-mb-md" />
        <q-input
          filled
          v-model="descripcion"
          label="Descripción"
          type="textarea"
          autogrow
          class="q-mb-md"
          :rows="5"
        />
        <q-select
          filled
          v-model="categoria"
          :options="categorias"
          label="Categoría"
          class="q-mb-md"
        />
        <q-input filled v-model="incentivo" label="Incentivo" type="number" class="q-mb-md" />
        <div class="q-mb-xs">
          <span>Correo de contacto:</span>
          <span class="text-grey-6" style="font-size: 0.9em; margin-left: 8px">{{
            correoUsuario
          }}</span>
        </div>
        <q-input filled v-model="correo" :placeholder="correoUsuario" class="q-mb-lg" />
        <q-btn color="negative" label="Enviar Propuesta" class="full-width" type="submit" />
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'

const tema = ref('')
const descripcion = ref('')
const categoria = ref(null)
const incentivo = ref('')
const correo = ref('')
const categorias = ref([])
const correoUsuario = ref('')

onMounted(async () => {
  // Cargar categorías reales desde el backend
  try {
    const res = await api.get('/api/Categorias')
    categorias.value = res.data.map((c) => ({ label: c.nombreCategoria, value: c.categoriaId }))
  } catch {
    categorias.value = []
  }
  // Obtener correo real del usuario logueado
  const user = JSON.parse(localStorage.getItem('user'))
  correoUsuario.value = user?.correo || ''
  if (!correo.value) correo.value = correoUsuario.value
})

const enviarPropuesta = async () => {
  // Validación básica
  if (!tema.value || !descripcion.value || !categoria.value || !incentivo.value || !correo.value) {
    this?.$q?.notify?.({ type: 'negative', message: 'Completa todos los campos.' })
    return
  }
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    await api.post('/api/Propuestas', {
      tema: tema.value,
      descripcion: descripcion.value,
      categoriaId: categoria.value.value || categoria.value, // según formato del select
      incentivo: incentivo.value,
      correo: correo.value,
      usuarioId: user?.usuarioId,
      nombreProfesor: user?.nombre || '',
    })
    tema.value = ''
    descripcion.value = ''
    categoria.value = null
    incentivo.value = ''
    correo.value = correoUsuario.value
    this?.$q?.notify?.({ type: 'positive', message: 'Propuesta enviada con éxito.' })
  } catch (err) {
    this?.$q?.notify?.({ type: 'negative', message: 'Error al enviar propuesta.' })
    console.error(err)
  }
}
</script>

<script>
export default {
  name: 'PropuestasPage',
}
</script>
