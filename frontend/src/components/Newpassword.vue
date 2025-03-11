<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { getCookie, parseJwt } from "../lib/common";

const password = ref('');
const confirmPassword = ref('');
const router = useRouter();
const isLoading = ref(false);
const isRedirecting = ref(false);

onMounted(() => {
  const access_token = getCookie("access_token");

  if (access_token) {
    const jocookie = parseJwt(access_token);
  }
});

function ChangePassword() {
  if (password.value !== confirmPassword.value) {
    alert("A két jelszó nem egyezik.");
    isLoading.value = false;
    return;
  }
}
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card p-4 shadow-lg login-card" style="width: 350px">
      <h3 class="text-center mb-4">Jelszó módosítása</h3>

      <transition name="fade">
        <div v-if="!isRedirecting" class="login-form">
          <div class="mb-3">
            <label for="password" class="form-label">Új jelszó</label>
            <input
              type="password"
              id="password"
              class="form-control"
              v-model="password"
            />
          </div>
          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Új jelszó megerősítése</label>
            <input
              type="password"
              id="confirmPassword"
              class="form-control"
              v-model="confirmPassword"
            />
          </div>

          <div class="d-flex justify-content-center">
            <button
              class="btn btn-primary w-100"
              @click="ChangePassword"
              :disabled="isLoading"
            >
              <span v-if="isLoading">Jelszó módosítása...</span>
              <span v-else>Jelszó módosítása</span>
            </button>
          </div>
          <br />
          <div class="d-flex justify-content-center">
            <RouterLink to="/">Visszalépés</RouterLink>
          </div>
        </div>
      </transition>

      <div v-if="isLoading || isRedirecting" class="loading-spinner">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

button[disabled] {
  background-color: #ddd;
  border-color: #ddd;
}

.login-card {
  transform: scale(0.95);
  transition: transform 0.3s ease-in-out;
}

.login-card:hover {
  transform: scale(1);
}

button {
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-3px);
}

button:active {
  transform: translateY(1px);
}
</style>
