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
      <!-- Espacio para el último post de Twitter/X -->
      <div class="q-mt-xl text-center">
        <q-separator spaced />
        <div class="text-h6 q-mb-sm">Última novedad en Twitter/X</div>
        <!-- Aquí se inserta el widget de Twitter/X -->
        <div class="twitter-center"><div ref="twitterContainer"></div></div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'

// Referencia al contenedor donde se insertará el widget
const twitterContainer = ref(null)

// Pega aquí el ID del tweet más reciente del vicerrectorado
// Para obtener el ID, ve al tweet y copia la parte final de la URL: https://twitter.com/EsanVdi/status/NUMERO_ID
const ultimoTweetId = '1802735275715489792' // <-- ID real del tweet más reciente

onMounted(() => {
  if (twitterContainer.value) {
    twitterContainer.value.innerHTML = ''
  }
  // Si tienes el ID del tweet más reciente, usa el widget de tweet único:
  if (ultimoTweetId && ultimoTweetId !== '' && ultimoTweetId !== 'INSERTA_AQUI_EL_ID_DEL_TWEET') {
    const blockquote = document.createElement('blockquote')
    blockquote.className = 'twitter-tweet'
    const a = document.createElement('a')
    // Cambia el usuario si es necesario
    a.href = `https://twitter.com/EsanVdi/status/${ultimoTweetId}`
    blockquote.appendChild(a)
    if (twitterContainer.value) {
      twitterContainer.value.appendChild(blockquote)
    }
  } else {
    // Si no hay ID, muestra un mensaje o el timeline como fallback
    const a = document.createElement('a')
    a.setAttribute('class', 'twitter-timeline')
    a.setAttribute('data-tweet-limit', '1')
    a.setAttribute('href', 'https://twitter.com/EsanVdi')
    a.innerText = 'Tweets by Vicerrectorado'
    if (twitterContainer.value) {
      twitterContainer.value.appendChild(a)
    }
  }
  // Carga el script oficial de Twitter/X solo si no está ya cargado
  if (!window.twttr) {
    const script = document.createElement('script')
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js')
    script.setAttribute('async', '')
    script.setAttribute('charset', 'utf-8')
    document.body.appendChild(script)
  } else {
    window.twttr.widgets.load()
  }
})
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

/* Centrar el widget de Twitter/X */
/* Centrar el widget de Twitter/X sin "apretarlo" y respetando el ancho original */
.twitter-center {
  width: 100%;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.twitter-center blockquote.twitter-tweet {
  margin: 0 auto !important;
  max-width: 550px; /* Ancho natural del embed de Twitter */
}
</style>
