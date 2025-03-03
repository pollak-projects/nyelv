<script setup>
import { Toolbar, Button, Avatar, Card, Timeline } from "primevue";
import { RouterLink } from "vue-router";
import ProgressBar from "primevue/progressbar";
import { onMounted, ref } from "vue";
import { getCookie, parseJwt } from "../lib/common.js";
import { Logout, GetUserProgress, GetUserLevel, GetDailyWord } from "../config/script.js";

const Logout2 = () => {
  Logout();
};

const user = ref(null);
const level = ref(null);
const dailyWordHU = ref(null);
const dailyWordENG = ref(null);

const timelineItems = ref([
  {
    status: "Started the course level started",
    date: "2025-02-12",
    icon: "pi pi-play",
  },
  {
    status: "Completed Beginner Level started",
    date: "2025-02-10",
    icon: "pi pi-check",
  },
  {
    status: "Intermediate level started",
    date: "2025-02-05",
    icon: "pi pi-play",
  },
    {
    status: "Intermediate",
    date: "2025-02-05",
    icon: "pi pi-play",
  },
]);

onMounted(async () => {
  const userObj = parseJwt(getCookie("access_token"));
  user.value = userObj;
  if (userObj && userObj.username){
    const progress = await GetUserProgress(userObj.sub)
  }

  level.value = await GetUserLevel(userObj.sub)
  const dailyWord = await GetDailyWord()
  dailyWordHU.value = dailyWord[1]
  dailyWordENG.value = dailyWord[0]

});
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Toolbar
    style="border-radius: 3rem; padding: 1rem 1rem 1rem 1.5rem"
    class="mt-1 ml-1 mr-1"
  >
    <template #start>
      <div class="flex items-center gap-2">
        <RouterLink to="/main">
          <Button label="Home" text plain />
        </RouterLink>
        <RouterLink to="/chat"
          ><Button label="Chat" text plain /></RouterLink>
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

    <!-- Welcome Message -->
    <h1 class="text-3xl font-bold ps-4 pt-4">Üdv {{ user?.username }}!</h1>

    <!-- Course Cards -->
    <div class="flex gap-6 px-4 mt-8 justify-evenly flex-wrap">
      <Card class="shadow-lg rounded-lg overflow-hidden w-1/3 min-w-72">
        <template #header>
          <img alt="English Course" src="../assets/england.png" class="w-full h-48 object-cover" />
        </template>
        <template #title>Angol kurzus</template>
        <template #subtitle>
          <RouterLink to="/tanfolyam">
            <Button label="Folytatás" class="w-full mt-4" />
          </RouterLink>
        </template>
      </Card>

      

      <Card class="shadow-lg rounded-lg overflow-hidden w-1/3 min-w-72">
        <template #header>
          <img alt="Discombobulate" src="../assets/napiszobackground.png" class="w-full h-48 object-cover" />
        </template>
        <template #title>{{ dailyWordENG }}</template>
        <template #subtitle>{{dailyWordHU }}</template>
      </Card>
    </div>

    <!-- Timeline and Progress Section -->
    <div class="grid grid-cols-1 lg:grid-cols-1 gap-6 px-4 mt-8">
      <!-- Timeline -->
      <div class="bg-white shadow-lg rounded-lg p-6">
        <h2 class="text-xl font-bold mb-4">Aktivitások</h2>
        <Timeline :value="timelineItems" layout="horizontal" align="bottom">
          <template #content="slotProps">
            <div class="p-4 bg-gray-50 rounded-lg">
              <p class="h-10 font-bold">{{ slotProps.item.status }}</p>
              <small class="block text-gray-500">{{ slotProps.item.date }}</small>
            </div>
          </template>
        </Timeline>
      </div>

      <!-- Progress Card -->
      <Card class="shadow-lg rounded-lg">
        <template #title>A jelenlegi haladásod:</template>
        <template #subtitle>Remek munka!</template>
        <template #content>
          <div class="space-y-4">
            <div>
              <h4 class="font-semibold">Beginner</h4>
              <ProgressBar :value="user?.user_current_progress" class="mt-2" />
            </div>
            <hr />
            <div>
              <h4 class="font-semibold">Intermediate</h4>
              <ProgressBar :value="0" class="mt-2" />
            </div>
            <hr />
            <div>
              <h4 class="font-semibold">Polyglot master</h4>
              <ProgressBar :value="0" class="mt-2" />
            </div>
          </div>
        </template>
      </Card>
      
    </div>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white mt-8 py-6">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-between items-center">
          <div class="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener" class="hover:text-gray-400">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener" class="hover:text-gray-400">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener" class="hover:text-gray-400">Instagram</a>
          </div>
          <div class="text-sm text-gray-400">
            &copy; 2025 Your Company. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Additional custom styles if needed */
</style>