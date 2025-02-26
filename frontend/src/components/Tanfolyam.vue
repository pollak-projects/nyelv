<script setup>
import { Toolbar, Button, Avatar, ProgressBar, Card } from "primevue";
import { RouterLink, useRouter } from "vue-router";
import { Logout, GetUserProgress } from "../config/script.js";
import { onMounted, ref } from "vue";
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
  }
}

const Logout2 = () => {
  Logout();
};

onMounted(async () => {
  const userObj = parseJwt(getCookie("access_token"));
  user.value = userObj;
  if (userObj && userObj.username) {
    const progress = await GetUserProgress(userObj.username);
    user.value.user_current_progress = progress;
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
      <Card class="p-6 shadow-md border border-gray-200 rounded-lg">
        <template #content>
          <h4 class="text-lg font-semibold text-gray-700">Beginner</h4>
          <ProgressBar :value="user?.user_current_progress" class="mt-2" />
          <div class="mt-4 flex justify-end">
            <Button @click="ToCorrectTask(user?.user_current_progress)" label="Folytatás" class="bg-green-500 text-white px-4 py-2 rounded-lg" />
          </div>
        </template>
      </Card>
      
      <Card class="p-6 shadow-md border border-gray-200 rounded-lg disabled">
        <template #content>
          <h4 class="text-lg font-semibold text-gray-700">Intermediate</h4>
          <ProgressBar :value="0" class="mt-2" />
        </template>
      </Card>
      
      <Card class="p-6 shadow-md border border-gray-200 rounded-lg disabled">
        <template #content>
          <h4 class="text-lg font-semibold text-gray-700">Polyglot Master</h4>
          <ProgressBar :value="0" class="mt-2" />
        </template>
      </Card>
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
