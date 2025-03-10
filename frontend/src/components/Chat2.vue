<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import socket from "../socket.js";

const messages = ref([]);
const newMessage = ref("");

const sendMessage = () => {
  if (newMessage.value.trim()) {
    socket.emit("chat message", newMessage.value);
    newMessage.value = "";
  }
};

onMounted(() => {
  socket.on("chat message", (msg) => {
    messages.value.push(msg);
  });
});

onUnmounted(() => {
  socket.off("chat message");
});
</script>

<template>
  <div>
    <ul>
      <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
    </ul>
    <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Üzenet..." />
    <button @click="sendMessage">Küldés</button>
  </div>
</template>
