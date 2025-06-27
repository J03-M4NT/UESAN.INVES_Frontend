<template>
  <q-page padding>
    <h1 class="text-h5 q-mb-md">Mis elementos guardados</h1>

    <div v-if="revistas.length === 0">
      <p>No has guardado ninguna revista aún.</p>
    </div>

    <div class="row q-col-gutter-md">
      <div v-for="revista in revistas" :key="revista.id" class="col-12 col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-subtitle1">{{ revista.titulo }}</div>
            <div class="text-caption text-grey">{{ revista.indice }}</div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn label="Ver más" :to="`/revista/${revista.id}`" flat />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { obtenerRevistas } from 'src/services/RevistasService'

const revistas = ref([])

onMounted(async () => {
  const todas = await obtenerRevistas()
  const guardadas = JSON.parse(localStorage.getItem('revistasGuardadas')) || []
  revistas.value = todas.filter((r) => guardadas.includes(r.id))
})
</script>
