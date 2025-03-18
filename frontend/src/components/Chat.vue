<script setup>
import { Toolbar, Button, Avatar, InputText, Dialog  } from "primevue";
import { ref, onMounted, onUnmounted } from "vue";
import socket from "../socket.js";
import { RouterLink } from "vue-router";
import { getCookie, parseJwt } from "../lib/common.js";
import { Logout } from "../config/script.js";

const Logout2 = () => {
  Logout();
};

const messages = ref([]);
const Mymessages = ref([]);
const newMessage = ref("");
const visible = ref(true);
const userId = "41596d56-5630-4223-b2c2-1d8d126fbd46";
const sendMessage = () => {
  if (newMessage.value.trim()) {
    socket.emit("chat message", {text: newMessage.value, userId});
    newMessage.value = "";
  }
};

onMounted(() => {
  socket.on("chat message", (msg) => {
    if (msg.userId === "Zete") {
      msg.userId = "Én";
      Mymessages.value.push(msg);
      console.log(Mymessages.value)
    }else{
      messages.value.push(msg);

    }
  });
});

onUnmounted(() => {
  socket.off("chat message");
});
</script>

<template>
  <Toolbar
    style="border-radius: 3rem; padding: 1rem 1rem 1rem 1.5rem"
    class="mt-1 ml-1 mr-1"
  >
    <template #start>
      <div class="flex items-center gap-2">
        <RouterLink to="/main">
          <Button label="Home" text plain />
        </RouterLink>
        <RouterLink to="/chat"><Button label="Chat" text plain /></RouterLink>
        <RouterLink to="/tanfolyam"
          ><Button label="Tanfolyamok" text plain
        /></RouterLink>
      </div>
    </template>

    <template #end>
      <div class="flex items-center gap-2">
        <Button @click="Logout2" label="Kilépés" text plain />
        <RouterLink to="/profile"
          ><Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            style="width: 32px; height: 32px"
        /></RouterLink>
      </div>
    </template>
  </Toolbar>
  <div class="flex flex-row justify-center mt-6">
    <div class="w-1/3 p-4">
      <div v-for="(msg, index) in messages" :key="index" class="mb-3">
        <div class="font-bold pl-2 text-gray-700">{{ msg.userId }}</div>
        <div class="bg-purple-100 rounded-xl p-3 shadow-md">
          {{ msg.text }}
        </div>
      </div>
    </div>

    <div class="w-1/3">

<Dialog v-model:visible="visible" modal header="Chat Rules" :style="{ width: '30rem' }" class="rounded-lg">
  <div class=" space-y-3 text-gray-700">
    <p>To ensure a friendly and respectful environment, please follow these rules:</p>
    <ul class="list-disc p-4 space-y-1">
      <li><strong>English Only</strong> - Please communicate only in English.</li>
      <li><strong>Be Respectful</strong> - Treat others with kindness and respect.</li>
      <li><strong>No Hate Speech</strong> - Discrimination or offensive language is prohibited.</li>
      <li><strong>No Spamming</strong> - Avoid excessive messages or repetition.</li>
      <li><strong>No NSFW Content</strong> - Keep the chat appropriate for all users.</li>
      <li><strong>No Personal Info</strong> - Do not share sensitive personal information.</li>
      <li><strong>Follow Moderation</strong> - Respect moderators and their decisions.</li>
    </ul>
    <p class="text-red-600 font-semibold mt-3">
      Breaking the rules may result in a temporary or permanent ban!
    </p>
  </div>
  <div class="flex justify-end gap-2 mt-4">
    <Button type="button" label="Accept" severity="secondary" class="px-4 py-2 rounded-lg" @click="visible = false"></Button>
  </div>
</Dialog></div>

    <div class="w-1/3 p-4">
      <div v-for="(msg, index) in Mymessages" :key="index" class="mb-3">
        <div class="font-bold text-right pr-2 text-gray-700">{{ msg.userId }}</div>
        <div class="bg-blue-100 rounded-xl p-3 shadow-md text-right">
          {{ msg.text }}
        </div>
      </div>
    </div>
  </div>

  <div class="fixed bottom-0 inset-x-0 p-4 bg-white shadow-lg flex items-center gap-4">
    <InputText type="text" v-model="newMessage" @keyup.enter="sendMessage" class="w-5/6 p-2 border rounded-lg" placeholder="Írj egy üzenetet..." />
    <Button label="Küldés" class="w-1/6 p-button-primary" @click="sendMessage" />
  </div>
</template>

<style scoped>

</style>
