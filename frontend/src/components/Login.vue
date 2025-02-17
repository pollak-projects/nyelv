<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { getCookie, parseJwt } from "../lib/common";
import { username_store } from "../config/store";


const username = ref("");
const password = ref("");
const router = useRouter();
const isLoading = ref(false);
const isRedirecting = ref(false);

onMounted(() => {
  const access_token = getCookie("access_token");

  if (access_token) {
    const jocookie = parseJwt(access_token);
  }
});

function Login() {
  isLoading.value = true;

  fetch(`http://localhost:3300/auth/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  })
    .then(async (res) => {
      const data = await res.json();
      isLoading.value = false;

      if (!data.message && data.access_token) {
        console.log(data);

        isRedirecting.value = true;
        username_store.value = username.value;
        setTimeout(() => {
          router.push("/main");
        }, 2000);
      } else {
        alert(data.message || "Érvénytelen felhasználónév vagy jelszó.");
      }
    })
    .catch((error) => {
      isLoading.value = false;
      console.error("Sikertelen bejelentkezés", error);
      alert("Valami hiba történt. Próbáld meg később!");
    });
}
</script>

<template>
  <div
    class="container d-flex justify-content-center align-items-center min-vh-100"
  >
    <div class="card p-4 shadow-lg login-card" style="width: 350px">
      <h3 class="text-center mb-4">Bejelentkezés</h3>

      <transition name="fade">
        <div v-if="!isRedirecting" class="login-form">
          <div class="mb-3">
            <label for="username" class="form-label">Felhasználónév</label>
            <input
              type="text"
              id="username"
              class="form-control"
              v-model="username"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Jelszó</label>
            <input
              type="password"
              id="password"
              class="form-control"
              v-model="password"
            />
          </div>
          <div class="d-flex justify-content-center">
            <button
              class="btn btn-primary w-100"
              @click="Login"
              :disabled="isLoading"
            >
              <span v-if="isLoading">Bejelentkezés...</span>
              <span v-else>Bejelentkezés</span>
            </button>
          </div>
          <br />
          <div class="d-flex justify-content-center">
            <RouterLink to="/register">Még nem vagy regisztrálva?</RouterLink>
          </div>
          <div class="d-flex justify-content-center">
            <RouterLink to="/forgotpassword"
              >Elfelejtetted a jelszavad?</RouterLink
            >
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
