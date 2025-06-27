<!-- Parte Joe -->

<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="text-center q-mb-lg">
        <h2 class="text-h5">Noticias del Vicerrectorado de Investigación</h2>
        <p class="text-caption">
          Entérate de las novedades, anuncios y logros recientes del vicerrectorado. Solo los
          usuarios con rol de administrador pueden publicar novedades aquí.
        </p>
      </div>
      <!-- Placeholder de novedades -->
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-subtitle1">Nueva convocatoria de proyectos 2025</div>
          <div class="text-caption text-grey">Publicado por Admin • 27 de junio de 2025</div>
          <div class="q-mt-sm">
            ¡Participa en la nueva convocatoria para proyectos de investigación interdisciplinarios!
            Consulta las bases en la sección de convocatorias.
          </div>
        </q-card-section>
      </q-card>
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-subtitle1">Reconocimiento a investigadores destacados</div>
          <div class="text-caption text-grey">Publicado por Admin • 20 de junio de 2025</div>
          <div class="q-mt-sm">
            Felicitamos a los investigadores premiados por su contribución a la ciencia y la
            innovación en ESAN.
          </div>
        </q-card-section>
      </q-card>
      <!-- Espacio para el último post de Twitter -->
      <div class="q-mt-xl text-center">
        <q-separator spaced />
        <div class="text-h6 q-mb-sm">Última novedad en Twitter</div>
        <div class="twitter-placeholder">
          Aquí se mostrará el último post de Twitter del Vicerrectorado de Investigación.
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
// Placeholder, aquí luego irá la lógica para novedades y Twitter
</script>

<style scoped>
.twitter-placeholder {
  min-height: 120px;
  background: #f5f8fa;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #657786;
  font-size: 1.1rem;
  margin-top: 1rem;
  border: 1px solid #e1e8ed;
}
</style>
