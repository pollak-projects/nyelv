<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const first_name = ref("");
const last_name = ref("");
const birth_date = ref("");
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const isRedirecting = ref(false);

function Register() {
  isLoading.value = true;

  fetch(`http://localhost:3300/auth/register`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      username: username.value,
      first_name: first_name.value,
      last_name: last_name.value,
      birth_date: birth_date.value,
      email: email.value,
      password: password.value,
    }),
  })
    .then(async (res) => {
      isLoading.value = false;

      if (res.status === 201) {
        isRedirecting.value = true;

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        alert("Regisztráció sikertelen. Próbáld meg újra!");
      }
    })
    .catch((err) => {
      isLoading.value = false;
      console.error(err);
      alert("Valami hiba történt. Próbáld meg később!");
    });
}
</script>

<template>
  <div
    class="container d-flex justify-content-center align-items-center min-vh-100"
  >
    <div class="card p-4 shadow-lg register-card" style="width: 350px">
      <h3 class="text-center mb-4">Regisztráció</h3>

      <transition name="fade">
        <div v-if="!isRedirecting" class="register-form">
          <div class="mb-3">
            <input
              type="text"
              id="username"
              class="form-control"
              placeholder="Felhasználónév"
              v-model="username"
            />
          </div>

          <div class="mb-3">
            <input
              type="text"
              id="first_name"
              class="form-control"
              placeholder="Keresztnév"
              v-model="first_name"
            />
          </div>

          <div class="mb-3">
            <input
              type="text"
              id="last_name"
              class="form-control"
              placeholder="Vezetéknév"
              v-model="last_name"
            />
          </div>

          <div class="mb-3">
            <input
              type="date"
              id="birth_date"
              class="form-control"
              placeholder="Születési dátum"
              v-model="birth_date"
            />
          </div>

          <div class="mb-3">
            <input
              type="email"
              id="email"
              class="form-control"
              placeholder="Email"
              v-model="email"
            />
          </div>

          <div class="mb-3">
            <input
              type="password"
              id="password"
              class="form-control"
              placeholder="Jelszó"
              v-model="password"
            />
          </div>

          <div class="d-flex justify-content-center">
            <button
              class="btn btn-primary w-100"
              @click="Register"
              :disabled="isLoading"
            >
              <span v-if="isLoading">Regisztráció...</span>
              <span v-else>Regisztráció</span>
            </button>
          </div>
          <br />
          <div class="d-flex justify-content-center">
            <RouterLink to="/">Van már fiókod?</RouterLink>
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

.register-card {
  transform: scale(0.95);
  transition: transform 0.3s ease-in-out;
}

.register-card:hover {
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
