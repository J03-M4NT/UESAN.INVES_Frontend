<template>
  <div>
    <div class="chatbot-fab" v-if="!open" @click="open = true">💬</div>
    <div class="chatbot-container" v-else>
      <div class="chatbot-header">
        ChatBot
        <span style="float: right; cursor: pointer" @click="open = false">✖</span>
      </div>
      <div class="chatbot-messages">
        <div v-for="(msg, i) in messages" :key="i" :class="msg.from">
          {{ msg.text }}
        </div>
      </div>
      <form @submit.prevent="sendMessage">
        <input v-model="input" placeholder="Escribe tu mensaje..." autocomplete="off" />
        <button type="submit">Enviar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const open = ref(false)
const input = ref('')
const messages = ref([
  {
    from: 'bot',
    text: 'Hola. Soy el asistente del Vicerrectorado de Investigación (VDI) de ESAN. ¿En qué puedo ayudarte?',
  },
])

const GEMINI_API_KEY = 'AIzaSyDmWAxUEsdo2nabHkpWDaJy6qU5SziNkRw'

// 🎯 Este es el contexto que se envía en cada prompt
const CONTEXTO_VDI = `
Hola. A partir de ahora, actúa como un asistente virtual de la intranet del Vicerrectorado de Investigación (VDI) de la Universidad ESAN. Tu tarea es responder consultas de profesores, alumnos, o personal externo sobre temas relacionados con la publicación académica, revistas científicas, patentes, proyectos de investigación, casos de estudio y líneas de investigación institucionales, únicamente usando la información que se te ha proporcionado a continuación.

📌 CONTEXTO GENERAL:
El Vicerrectorado de Investigación (VDI) lidera, promueve y gestiona proyectos de investigación con alto impacto académico e internacional. Se encarga de fomentar publicaciones científicas en revistas indexadas (SCOPUS, WoS, AJG, etc.), apoyar en la generación de artículos, libros, casos de estudio y patentes, facilitar el acceso a fondos nacionales e internacionales, y difundir producción científica a través de ESAN Ediciones y revistas institucionales como JEFAS.

📘 TIPOS DE PRODUCTOS APOYADOS:
- Papers (revistas indexadas)
- Libros y capítulos (ESAN Ediciones)
- Casos de estudio (educativos o empresariales)
- Patentes (desarrollos tecnológicos)
- Proyectos (buscan financiamiento)

🧪 EJEMPLOS DE PATENTES:
- Soporte ergonómico para laptop
- Aplicación Qarvis (educativa en química)

📚 LÍNEAS DE INVESTIGACIÓN:
Administración, Derecho, Psicología, Medio Ambiente, Marketing, Sistemas de Información, Economía y Finanzas, Supply Chain, Turismo y Hotelería, entre otros.

🎓 IMPORTANTE:
Siempre responde en el contexto del VDI. No inventes información. Si no sabes algo, sugiere consultar con el equipo del VDI o visitar https://investigaciones.esan.edu.pe
`

async function fetchGeminiResponse(userInput) {
  const fullPrompt = `${CONTEXTO_VDI}\n\n👤 Usuario pregunta:\n${userInput}`

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' +
        GEMINI_API_KEY,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
        }),
      },
    )

    if (!response.ok) throw new Error('Error al conectar con Gemini API')
    const data = await response.json()
    const geminiReply = data.candidates?.[0]?.content?.parts?.[0]?.text
    return geminiReply || 'No se obtuvo respuesta de la IA.'
  } catch (err) {
    console.error(err)
    return '❌ No se pudo conectar con el asistente. Intenta más tarde.'
  }
}

async function sendMessage() {
  if (!input.value) return
  messages.value.push({ from: 'user', text: input.value })
  const response = await fetchGeminiResponse(input.value)
  messages.value.push({ from: 'bot', text: response })
  input.value = ''
}
</script>

<style scoped>
.chatbot-fab {
  position: fixed;
  bottom: 32px;
  right: 32px;
  background: #d32f2f;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  font-size: 2rem;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  z-index: 3000;
}
.chatbot-container {
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 320px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(44, 44, 44, 0.18);
  display: flex;
  flex-direction: column;
  z-index: 3001;
}
.chatbot-header {
  background: #d32f2f;
  color: #fff;
  padding: 1rem;
  border-radius: 16px 16px 0 0;
  font-weight: bold;
  cursor: pointer;
}
.chatbot-messages {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  max-height: 250px;
}
.bot {
  background: #f7f7f7;
  color: #222;
  padding: 0.5rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}
.user {
  background: #d32f2f;
  color: #fff;
  padding: 0.5rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  text-align: right;
}
form {
  display: flex;
  border-top: 1px solid #eee;
}
input {
  flex: 1;
  border: none;
  padding: 0.7rem;
  border-radius: 0 0 0 16px;
  outline: none;
}
button {
  background: #d32f2f;
  color: #fff;
  border: none;
  padding: 0 1rem;
  border-radius: 0 0 16px 0;
  cursor: pointer;
}
</style>
