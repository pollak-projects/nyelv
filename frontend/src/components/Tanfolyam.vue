<script setup>
import { Toolbar, Button, Avatar } from "primevue";
import { RouterLink, useRouter } from "vue-router";
import { Logout } from "../config/script.js";
import ProgressBar from "primevue/progressbar";
import { GetUserProgress } from "../config/script.js";
import { user_current_progress_store } from "../config/store.js";

const router = useRouter();

function ToTaskOne() {
  router.push("/taskone");
}

const Logout2 = () => {
  Logout();
};


user_current_progress_store  = GetUserProgress(user)
</script>

<template>
  <div class="card">
    <Toolbar style="border-radius: 3rem; padding: 1rem 1rem 1rem 1.5rem">
      <template #start>
        <div class="flex items-center gap-2">
          <RouterLink to="/main"><Button label="Home" text plain /></RouterLink>
          <Button label="Chat" text plain />
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
  </div>
  <div class="mt-4">
    <h1 class="text-center">Tanfolyamok</h1>
    <div class="mt-2 mb-30">
      <h4>Beginner</h4>
      <ProgressBar :value="60"></ProgressBar>
      <Button @click="ToTaskOne" label="Folytatás" severity="success" />
    </div>
    <hr />
    <div class="mt-2 disabled mb-30">
      <h4>Intermediate</h4>
      <ProgressBar :value="0"></ProgressBar>
    </div>
    <hr />
    <div class="mt-2 disabled">
      <h4>Polyglot master</h4>
      <ProgressBar :value="0"></ProgressBar>
    </div>
  </div>
</template>

<style scoped>
.disabled {
  pointer-events: none; /* Nem lehet kattintani */
  opacity: 0.5; /* Halványabb megjelenés */
  filter: grayscale(100%); /* Szürkeárnyalatúvá teszi */
  cursor: not-allowed; /* Tiltott kurzor */
}
</style>
