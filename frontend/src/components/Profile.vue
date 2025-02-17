<script setup>
import { Toolbar, Button, Avatar, Card } from "primevue";
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
  <div class="card">
    <Toolbar style="border-radius: 3rem; padding: 1rem 1rem 1rem 1.5rem">
      <template #start>
        <div class="flex items-center gap-2">
          <RouterLink to="/main"><Button label="Home" text plain /></RouterLink>
          <Button label="Chat" text plain />
          <Button label="Tanfolyamok" text plain />
        </div>
      </template>

      <template #end>
        <div class="flex items-center gap-2">
          <Button @click="Logout" label="Kilépés" text plain />
          <Avatar
            v-if="user"
            :image="
              user.avatarUrl ||
              'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png'
            "
            style="width: 32px; height: 32px"
          />
        </div>
      </template>
    </Toolbar>
  </div>

  <div class="main-container mt-10">
    <Card style="width: 25rem; overflow: hidden">
      <template #header>
        <img
          :src="
            user?.avatarUrl ||
            'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png'
          "
          class="mx-auto flex p-3 items-center justify-center"
          alt="User Avatar"
        />
      </template>
      <template #title >{{ user?.username || "Loading..." }}</template>
      <template #subtitle>{{
        userLevelName(user?.level) || "Loading..."
      }}</template>
      <template #content>
        <div class="m-0">
          <div class="container">
            <div class="mt-2 mb-10">
              <h4>Beginner</h4>
              <ProgressBar :value="user?.user_current_progress"></ProgressBar>
            </div>
            <hr />
            <div class="mt-2 disabled mb-10">
              <h4>Intermediate</h4>
              <ProgressBar :value="0"></ProgressBar>
            </div>
            <hr />
            <div class="mt-2 mb-10 disabled">
              <h4>Polyglot master</h4>
              <ProgressBar :value="0"></ProgressBar>
            </div>
          </div>
        </div>
      </template>
    </Card>
    <h1 class="ml-5">Achievementek</h1>
  </div>
</template>




<style scoped>
.main-container {
  display: flex;
}
</style>
