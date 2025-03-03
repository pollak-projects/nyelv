<script setup>
import { Toolbar, Button, Avatar, Card, InputText } from "primevue";
import { RouterLink } from "vue-router";
import { onMounted, ref } from "vue";
import ProgressBar from "primevue/progressbar";
import { Logout } from "../config/script.js";
import { getCookie, parseJwt } from "../lib/common.js";


const user = ref(null);

onMounted(() => {
  const userObj = parseJwt(getCookie("access_token"));

  user.value = userObj;
  console.log(user.value);
});

function userLevelName(level) {
  switch (level) {
    case 1:
      return "Beginner";
    case 2:
      return "Intermediate";
    case 3:
      return "Polyglot master";
    default:
      return "Unknown";
  }
}
</script>

<template>
  <div class="p-4 space-y-6">
    <!-- Navigation Toolbar -->
    <Toolbar class="rounded-3xl bg-white shadow-md">
      <template #start>
        <div class="flex items-center gap-4">
          <RouterLink to="/main"><Button label="Home" text /></RouterLink>
          <Button label="Chat" text />
          <Button label="Tanfolyamok" text />
        </div>
      </template>
      <template #end>
        <div class="flex items-center gap-4">
          <Button @click="Logout" label="Kilépés" text />
          <Avatar
            v-if="user"
            :image="user.avatarUrl || 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png'"
            class="w-10 h-10 border border-gray-300 shadow-sm rounded-full"
          />
        </div>
      </template>
    </Toolbar>

    <!-- Main Content -->
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Profile Card -->
      <Card class="w-full md:w-80 p-5 shadow-lg">
        <template #header>
          <div class="flex justify-center">
            <img
              :src="user?.avatarUrl || 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png'"
              class="w-24 h-24 rounded-full border border-gray-200 shadow-md"
              alt="User Avatar"
            />
          </div>
        </template>
        <template #title>
          <p class="text-center text-xl font-semibold">{{ user?.username || "Loading..." }}</p>
        </template>
        <template #subtitle>
          <p class="text-center text-gray-500">{{ userLevelName(user?.level) || "Loading..." }}</p>
        </template>
        <template #content>
          <div class="space-y-4">
            <div>
              <h4 class="text-lg font-medium">Beginner</h4>
              <ProgressBar :value="user?.user_current_progress"></ProgressBar>
            </div>
            <div>
              <h4 class="text-lg font-medium text-gray-400">Intermediate</h4>
              <ProgressBar :value="0" class="opacity-50"></ProgressBar>
            </div>
            <div>
              <h4 class="text-lg font-medium text-gray-400">Polyglot Master</h4>
              <ProgressBar :value="0" class="opacity-50"></ProgressBar>
            </div>
          </div>
        </template>
      </Card>
      
      <!-- Achievements -->
      <div class="flex-1 p-4 bg-white shadow-lg rounded-xl">
        <h1 class="text-2xl font-bold">Achievementek</h1>
        <!-- Add achievement content here -->
      </div>
    </div>

    <!-- Update Information Section -->
    <div class="p-4 bg-white shadow-lg rounded-xl space-y-4">
      <h1 class="text-xl font-semibold">Adatok frissítése</h1>
      <InputText type="text" v-model="value" class=" p-2 border rounded mb-3" placeholder="Felhasználónév" /> <br>
      <InputText type="text" v-model="value" class=" p-2 border rounded mb-3" placeholder="Email" />
      <Button label="Mentés" severity="success" class="w-full" />
    </div>
  </div>
</template>




<style scoped>
.main-container {
  display: flex;
}
</style>
