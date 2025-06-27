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

function sendMessage() {
  if (!input.value) return
  messages.value.push({ from: 'user', text: input.value })
  // Simulación de respuesta del bot
  setTimeout(() => {
    messages.value.push({ from: 'bot', text: 'Soy un bot de ejemplo.' })
  }, 800)
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
