<!-- Parte Joe -->

<template>
  <q-page padding>
    <div class="articulos-hero q-pa-md bg-primary text-white text-center q-mb-xl">
      <h2 class="text-h4 q-mb-xs">Artículos recomendados</h2>
      <p class="text-subtitle2">
        Filtra los artículos según tu línea de investigación para encontrar la mejor opción para tu
        lectura.
      </p>
    </div>
    <div class="q-pa-md">
      <div class="row items-center q-mb-lg">
        <div class="col-auto">
          <q-select
            v-model="filtro"
            :options="opcionesFiltro"
            label="Filtrar por línea de investigación"
            dense
            outlined
            color="primary"
            class="articulos-select"
            style="min-width: 240px"
          />
        </div>
      </div>
      <q-list bordered class="articulos-list">
        <q-item
          v-for="articulo in articulosFiltrados"
          :key="articulo.id"
          clickable
          class="articulo-card q-mb-md"
        >
          <q-item-section avatar>
            <q-avatar rounded size="48px" color="primary" text-color="white">
              <q-icon name="article" size="28px" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <div class="text-h6 text-primary">{{ articulo.titulo }}</div>
            <div class="text-caption text-grey-7 q-mt-xs">{{ articulo.lineaInvestigacion }}</div>
          </q-item-section>
        </q-item>
        <div v-if="articulosFiltrados.length === 0" class="text-center text-grey q-mt-lg">
          No hay artículos para esta línea de investigación.
        </div>
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'

// Opciones de filtro (placeholder)
const opcionesFiltro = [
  { label: 'Todas las líneas', value: 'todas' },
  { label: 'Innovación Empresarial', value: 'innovacion' },
  { label: 'Ciencia y Sociedad', value: 'ciencia' },
  { label: 'Tecnología y Educación', value: 'tecnologia' },
]

// Artículos de ejemplo (placeholder)
const articulos = ref([
  {
    id: 1,
    titulo: 'Estrategias de Innovación en Empresas',
    lineaInvestigacion: 'Innovación Empresarial',
    tipo: 'innovacion',
  },
  {
    id: 2,
    titulo: 'Impacto Social de la Ciencia',
    lineaInvestigacion: 'Ciencia y Sociedad',
    tipo: 'ciencia',
  },
  {
    id: 3,
    titulo: 'Tecnología en la Educación Moderna',
    lineaInvestigacion: 'Tecnología y Educación',
    tipo: 'tecnologia',
  },
  {
    id: 4,
    titulo: 'Gestión del Cambio Organizacional',
    lineaInvestigacion: 'Innovación Empresarial',
    tipo: 'innovacion',
  },
])

const filtro = ref('todas')

const articulosFiltrados = computed(() => {
  if (filtro.value === 'todas') return articulos.value
  return articulos.value.filter((a) => a.tipo === filtro.value)
})
</script>

<style scoped>
.articulos-hero {
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(44, 62, 80, 0.1);
  margin-bottom: 2.5rem;
}
.articulos-select {
  min-width: 240px;
  max-width: 320px;
}
.articulos-list {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px 0 rgba(44, 62, 80, 0.07);
  padding: 1.5rem 0.5rem;
}
.articulo-card {
  border-radius: 12px;
  transition:
    box-shadow 0.2s,
    background 0.2s;
  box-shadow: 0 2px 8px 0 rgba(44, 62, 80, 0.06);
  background: #f8f9fa;
}
.articulo-card:hover {
  background: #e3eafc;
  box-shadow: 0 4px 16px 0 rgba(44, 62, 80, 0.13);
}
</style>
