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
const messages = ref([{ from: 'bot', text: '¡Hola! ¿En qué puedo ayudarte?' }])

const faq = [
  {
    keywords: ['revistas', 'recomendadas'],
    answer: 'Puedes ver las revistas recomendadas en la sección "Revistas" de la página principal.',
  },
  {
    keywords: ['línea', 'investigación'],
    answer:
      'Las líneas de investigación disponibles son: Negocios Internacionales, Finanzas, Marketing, Innovación y Tecnología.',
  },
  {
    keywords: ['contacto', 'ayuda'],
    answer: 'Para ayuda o contacto, por favor escribe a soporte@esan.edu.pe.',
  },
  // Agrega más preguntas frecuentes aquí
]

async function fetchApiResponse(userMessage) {
  // Integración con Gemini API (Google AI)
  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCmn2OPT-EWF3w4fal9yMisu2BF3P-oSUY',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMessage }] }],
        }),
      },
    )
    if (!response.ok) throw new Error('Error en la API Gemini')
    const data = await response.json()
    // Ajusta según la estructura de la respuesta de Gemini
    const geminiReply = data.candidates?.[0]?.content?.parts?.[0]?.text
    return geminiReply || 'La API de Gemini no devolvió respuesta.'
  } catch {
    return 'No se pudo conectar con la API de Gemini.'
  }
}

async function sendMessage() {
  if (!input.value) return
  messages.value.push({ from: 'user', text: input.value })
  const userMsg = input.value.toLowerCase()
  let found = false
  for (const item of faq) {
    if (item.keywords.every((k) => userMsg.includes(k))) {
      messages.value.push({ from: 'bot', text: item.answer })
      found = true
      break
    }
  }
  if (!found) {
    // Llama a la API externa si no hay respuesta local
    const apiReply = await fetchApiResponse(input.value)
    messages.value.push({ from: 'bot', text: apiReply })
  }
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
