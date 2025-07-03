<template>
  <div class="virtual-assistant">
    <div class="va-header">Asistente Virtual</div>
    <div class="va-messages">
      <div v-for="(msg, i) in messages" :key="i" :class="msg.from">
        {{ msg.text }}
      </div>
    </div>
    <form @submit.prevent="sendMessage" class="va-form">
      <input v-model="input" placeholder="Escribe tu mensaje..." autocomplete="off" />
      <button type="submit">Enviar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('')
const messages = ref([
  { from: 'bot', text: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte?' },
])

// 🔧 Llamada al modelo gemini-2.0-flash con formato correcto del curl
async function fetchGeminiResponse(userMessage) {
  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': 'AIzaSyCmn2OPT-EWF3w4fal9yMisu2BF3P-oSUY', // Tu API key
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: userMessage,
                },
              ],
            },
          ],
        }),
      },
    )

    const data = await response.json()
    console.log('Respuesta de Gemini:', data)

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text
    return reply || 'La respuesta fue vacía.'
  } catch (error) {
    console.error('Error al conectar con la API de Gemini:', error)
    return 'No se pudo conectar con la API de Gemini.'
  }
}

async function sendMessage() {
  const text = input.value.trim()
  if (!text) return

  messages.value.push({ from: 'user', text })
  input.value = ''

  const reply = await fetchGeminiResponse(text)
  messages.value.push({ from: 'bot', text: reply })
}
</script>

<style scoped>
.virtual-assistant {
  width: 350px;
  margin: 40px auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(44, 44, 44, 0.18);
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', Arial, sans-serif;
}
.va-header {
  background: #d32f2f;
  color: #fff;
  padding: 1rem;
  border-radius: 16px 16px 0 0;
  font-weight: bold;
  text-align: center;
}
.va-messages {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  max-height: 300px;
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
.va-form {
  display: flex;
  border-top: 1px solid #eee;
}
.va-form input {
  flex: 1;
  border: none;
  padding: 0.7rem;
  border-radius: 0 0 0 16px;
  outline: none;
}
.va-form button {
  background: #d32f2f;
  color: #fff;
  border: none;
  padding: 0 1rem;
  border-radius: 0 0 16px 0;
  cursor: pointer;
}
</style>
