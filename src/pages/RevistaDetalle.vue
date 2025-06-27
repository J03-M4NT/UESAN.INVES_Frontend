<template>
  <q-page padding>
    <div v-if="revista">
      <h1 class="text-h5">{{ revista.titulo }}</h1>
      <p class="text-caption text-grey">
        Línea de investigación: <strong>{{ revista.linea }}</strong> <br />
        Índice: <strong>{{ revista.indice }}</strong>
      </p>

      <q-separator class="q-my-md" />

      <p><strong>Descripción:</strong> {{ revista.descripcion }}</p>

      <q-btn
        label="Visitar sitio de la revista"
        color="primary"
        :href="revista.enlace"
        target="_blank"
        class="q-mt-md"
      />
    </div>

    <div v-else>
      <q-spinner color="primary" />
      <p>Cargando revista...</p>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { obtenerRevistas } from 'src/services/RevistasService'

const route = useRoute()
const revista = ref(null)

onMounted(async () => {
  const todas = await obtenerRevistas()
  revista.value = todas.find((r) => String(r.id) === route.params.id)
})
</script>
