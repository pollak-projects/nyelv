<script setup>
import { Toolbar, Button, Avatar, Card, InputText } from "primevue";
import { RouterLink } from "vue-router";
import { onMounted, ref } from "vue";
import ProgressBar from "primevue/progressbar";
import { Logout } from "../config/script.js";
import { getCookie, parseJwt } from "../lib/common.js";


const user = ref(null);
const userLevel = ref(null)
const beginnerProgress = ref(0);
const intermediateProgress = ref(0);
const polyglotProgress = ref(0);

onMounted(() => {
  const userObj = parseJwt(getCookie("access_token"));

  user.value = userObj;
  userLevel.value = user.value.level;
    if (user.value.level == "beginner") {
    beginnerProgress.value = user.value.user_current_progress;
    console.log(user.value.user_current_progress)
  } else if (userLevel.value == "intermediate") {
    beginnerProgress.value = 100;
    intermediateProgress.value = user.value.user_current_progress;
  } else if (userLevel.value == "polyglot_master") {
    beginnerProgress.value = 100;
    intermediateProgress.value = 100;
    polyglotProgress.value = user.value.user_current_progress;
  }
  console.log(beginnerProgress.value)
});


</script>

<template>
  <div class="space-y-6">
    <!-- Navigation Toolbar -->
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
          <p class="text-center text-gray-500">{{ userLevel|| "Loading..." }}</p>
        </template>
        <template #content>
          <div class="space-y-4">
            <div>
              <h4 class="text-lg font-medium">Beginner</h4>
              <ProgressBar :value="beginnerProgress"></ProgressBar>
            </div>
            <div>
              <h4 class="text-lg font-medium text-gray-400">Intermediate</h4>
              <ProgressBar :value="intermediateProgress" class="opacity-50"></ProgressBar>
            </div>
            <div>
              <h4 class="text-lg font-medium text-gray-400">Polyglot Master</h4>
              <ProgressBar :value="polyglotProgress" class="opacity-50"></ProgressBar>
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
