<template>
  <q-page padding>
    <div class="q-mx-auto" style="max-width: 600px">
      <div class="text-h5 q-mb-lg">Ingresar información:</div>
      <q-form>
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
          <span>Correo:</span>
          <span class="text-grey-6" style="font-size: 0.9em; margin-left: 8px"></span>
        </div>
        <q-input filled v-model="correo" :placeholder="correoUsuario" class="q-mb-lg" />
        <q-btn color="negative" label="Enviar Propuesta" class="full-width" />
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
const correoUsuario = 'usuario@ejemplo.com' // Reemplaza por el correo real del usuario logueado
const categorias = ref([])

onMounted(async () => {
  // Cargar categorías reales desde el backend
  try {
    const res = await api.get('/api/Categorias')
    categorias.value = res.data.map((c) => ({ label: c.nombreCategoria, value: c.categoriaId }))
  } catch {
    categorias.value = []
  }
})
</script>

<script>
export default {
  name: 'PropuestasPage',
}
</script>
