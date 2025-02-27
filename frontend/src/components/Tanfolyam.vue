<script setup>
import { Toolbar, Button, Avatar, ProgressBar, Card } from "primevue";
import { RouterLink, useRouter } from "vue-router";
import { Logout, GetUserProgress, SetProgress } from "../config/script.js";
import { onMounted, ref} from "vue";
import { getCookie, parseJwt } from "../lib/common.js";

const router = useRouter();
const user = ref(null);

function ToCorrectTask(progress) {
  if (progress == 0) {
    router.push("/taskone");
  } else if (progress == 25) {
    router.push("/tasktwo");
  } else if (progress == 50) {
    router.push("/taskthree");
  } else if (progress == 75) {
    router.push("/taskfour");
  } else if (progress == 100) {
    router.push("/taskone");
  } else if (progress == 125) {
    router.push("/tasktwo");
  } else if (progress == 150) {
    router.push("/taskthree");
  } else if (progress == 175) {
    router.push("/taskfour");
  } else if (progress == 200) {
    router.push("/taskone");
  } else if (progress == 225) {
    router.push("/tasktwo");
  } else if (progress == 250) {
    router.push("/taskthree");
  } else if (progress == 275) {
    router.push("/taskfour");
  } 
}

function RevertLevel(progress) {
  if (progress != 0) {
    SetProgress("Zete", -(progress));
    user.value.level = 'beginner';
  }
}

const Logout2 = () => {
  Logout();
};

function changeUserLevel() {
  if (user.value.user_current_progress >= 0 && user.value.user_current_progress < 100 && user.value.level !== 'beginner') {
    user.value.level = 'beginner';
  }
  else if (user.value.user_current_progress >= 100 && user.value.user_current_progress < 200 && user.value.level !== 'intermediate') {
    user.value.level = 'intermediate';
  }
  else if (user.value.user_current_progress >= 200 && user.value.user_current_progress < 300 &&  user.value.level !== 'polyglot_master') {
    user.value.level = 'polyglot_master';
  }
}

onMounted(async () => {
  const userObj = parseJwt(getCookie("access_token"));
  user.value = userObj;
  if (userObj && userObj.username) {
    const progress = await GetUserProgress(userObj.username);
    user.value.user_current_progress = progress;
    changeUserLevel();
  }
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
  <div class="container mx-auto p-6">
  

    <div class="mt-10 text-center">
      <h1 class="text-3xl font-bold text-gray-800">Tanfolyamok</h1>
    </div>

    <div class="mt-6 space-y-6">
      <Card class="p-6 shadow-md border border-gray-200 rounded-lg" :class="{'disabled': user?.user_current_progress >= 100}">
        <template #content>
          <h4 class="text-lg font-semibold text-gray-700">Beginner</h4>
            <ProgressBar :value="Math.min(user?.user_current_progress, 100)" class="mt-2" />
          <div class="mt-4 flex justify-end">
            <Button @click="ToCorrectTask(user?.user_current_progress)" label="Folytatás" class="bg-green-500 text-white px-4 py-2 rounded-lg" />
          </div>
        </template>
      </Card>
      
      <Card class="p-6 shadow-md border border-gray-200 rounded-lg" :class="{'disabled': user?.user_current_progress < 100 || user?.user_current_progress >= 200}">
        <template #content>
          <h4 class="text-lg font-semibold text-gray-700">Intermediate</h4>
          <ProgressBar :value="Math.min(Math.max(user?.user_current_progress - 100, 0), 100)" class="mt-2" />
          <div class="mt-4 flex justify-end">
            <Button @click="ToCorrectTask(user?.user_current_progress)" label="Folytatás" class="bg-green-500 text-white px-4 py-2 rounded-lg" />
          </div>
        </template>
      </Card>
      
      <Card class="p-6 shadow-md border border-gray-200 rounded-lg" :class="{'disabled': user?.user_current_progress < 200 || user?.user_current_progress >= 300}">>
        <template #content>
          <h4 class="text-lg font-semibold text-gray-700">Polyglot Master</h4>
          <ProgressBar :value="Math.min(Math.max(user?.user_current_progress - 200, 0), 100)" class="mt-2" />
          <div class="mt-4 flex justify-end">
            <Button @click="ToCorrectTask(user?.user_current_progress)" label="Folytatás" class="bg-green-500 text-white px-4 py-2 rounded-lg" />
          </div>
        </template>
      </Card>
      <Button @click="RevertLevel(user?.user_current_progress)" label="Újrakezdés" class="bg-green-500 text-white px-4 py-2 rounded-lg" />
    </div>
  </div>
</template>

<style scoped>
.disabled {
  pointer-events: none;
  opacity: 0.5;
  filter: grayscale(100%);
  cursor: not-allowed;
}

</style>
