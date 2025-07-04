<!-- Parte Joe -->

<template>
  <q-page class="q-pa-md">
    <div class="noticias-wrapper">
      <!-- Hero superior -->
      <div class="noticias-hero q-mb-lg">
        <q-icon name="campaign" size="40px" class="q-mb-sm" />
        <h2 class="text-h5">Noticias del Vicerrectorado de Investigación</h2>
        <p class="text-caption">
          Entérate de las novedades, anuncios y logros recientes del VDI. Solo los administradores
          pueden publicar novedades aquí.
        </p>
      </div>

      <!-- Tarjetas de noticias -->
      <div class="noticia-list">
        <q-card class="noticia-card q-mb-md" flat bordered>
          <q-card-section>
            <div class="text-h6">Nueva convocatoria de proyectos 2025</div>
            <div class="text-caption text-grey">
              <q-chip size="sm" color="primary" text-color="white" icon="person">Admin</q-chip>
              • 27 de junio de 2025
            </div>
            <div class="q-mt-sm">
              ¡Participa en la nueva convocatoria para proyectos de investigación
              interdisciplinarios! Consulta las bases en la sección de convocatorias.
            </div>
          </q-card-section>
        </q-card>

        <q-card class="noticia-card q-mb-md" flat bordered>
          <q-card-section>
            <div class="text-h6">Reconocimiento a investigadores destacados</div>
            <div class="text-caption text-grey">
              <q-chip size="sm" color="primary" text-color="white" icon="person">Admin</q-chip>
              • 20 de junio de 2025
            </div>
            <div class="q-mt-sm">
              Felicitamos a los investigadores premiados por su contribución a la ciencia y la
              innovación en ESAN.
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Espacio para el último post de Twitter/X -->
      <div class="q-mt-xl">
        <q-separator spaced />
        <div class="text-h6 q-mb-sm">Última novedad en Twitter/X</div>
        <div class="twitter-center-horizontal"><div ref="twitterContainer"></div></div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const twitterContainer = ref(null)
const ultimoTweetId = '1802735275715489792'

onMounted(() => {
  if (twitterContainer.value) {
    twitterContainer.value.innerHTML = ''
  }

  if (ultimoTweetId) {
    const blockquote = document.createElement('blockquote')
    blockquote.className = 'twitter-tweet'
    const a = document.createElement('a')
    a.href = `https://twitter.com/EsanVdi/status/${ultimoTweetId}`
    blockquote.appendChild(a)
    if (twitterContainer.value) {
      twitterContainer.value.appendChild(blockquote)
    }
  }

  if (!window.twttr) {
    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true
    script.charset = 'utf-8'
    document.body.appendChild(script)
  } else {
    window.twttr.widgets.load()
  }
})
</script>

<style scoped>
.noticias-wrapper {
  max-width: 900px;
  margin: 0 auto;
}

.noticias-hero {
  background: linear-gradient(145deg, #e51c3b, #c91432);
  color: #fff;
  border-radius: 24px;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  text-align: center;
}
.noticias-hero h2 {
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
}
.noticias-hero p {
  margin-top: 0.5rem;
  opacity: 0.9;
  font-size: 0.9rem;
}

.noticia-card {
  transition: all 0.3s ease;
  cursor: default;
}
.noticia-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-4px);
}

.twitter-center {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1.2rem;
}
.twitter-center blockquote.twitter-tweet {
  width: 100% !important;
  max-width: 600px !important;
  min-width: 350px !important;
  box-sizing: border-box;
  aspect-ratio: 3/1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
</style>
