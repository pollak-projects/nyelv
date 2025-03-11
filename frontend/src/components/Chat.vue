<script setup>
import { Toolbar, Button, Avatar, Card, Timeline, InputText } from "primevue";
import { ref, onMounted, onUnmounted } from "vue";
import socket from "../socket.js";
import { RouterLink } from "vue-router";
import { getCookie, parseJwt } from "../lib/common.js";
import { Logout } from "../config/script.js";

const Logout2 = () => {
  Logout();
};

const messages = ref([]);
const newMessage = ref("");
const userId = parseJwt(getCookie("token")).id;
const sendMessage = () => {
  if (newMessage.value.trim()) {
    socket.emit("chat message", {text: newMessage.value, userId});
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
  <div class="flex flex-row text-center">
    <div class="basis-1/3 mb-4 mt-5">
      <div class="ml-150 font-bold">{{ user?.username }}</div>
      <div class="border-2 border-solid rounded-xl bg-amber-50 h-12 text-right">
        safsafsafsaf
      </div>
    </div>
    <div class="basis-1/3 mb-4 mt-5"></div>
    <div class="basis-1/3 mb-4 mt-20" v-for="(msg, index) in messages" :key="index">
      <div class="mr-150 font-bold">{{msg.userId}}</div>
      <div class="border-2 border-solid rounded-xl bg-amber-50 h-12 text-left">
        {{ msg.text }}
      </div>
    </div>
  </div>

  <div class="absolute inset-x-0 bottom-0 h-16 flex ...">
    <InputText type="text" v-model="newMessage" @keyup.enter="sendMessage" class="w-5/6" />
    <Button label="Küldés" class="w-1/6"  @click="sendMessage" />
  </div>
</template>

<script setup></script>
