<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { getCookie, parseJwt } from "../lib/common";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const email = defineModel();
const router = useRouter();
const isLoading = ref(false);
const isRedirecting = ref(false);
const showSuccess = (data) => {
  toast.add({
    severity: "contrast",
    summary: "Jelszó visszaállítás",
    detail: data,
    life: 5000,
  });
};

onMounted(() => {
  const access_token = getCookie("access_token");

  if (access_token) {
    const jocookie = parseJwt(access_token);
  }
});

function UpdatePassword(password) {
  fetch(`http://localhost:3300/updatepassword`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({
      useremail: email.value,
      password: password,
    }),
  })
    .then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        showSuccess(data.message);
      } else {
        showError(data.message);
      }
    })
    .catch((error) => {
      console.error("Hiba történt a jelszó frissítésekor:", error);
      alert("Valami hiba történt. Próbáld meg később!");
    });
}

function EmailSend() {
  isLoading.value = true;
  console.log(email.value);
  fetch(`http://localhost:3300/emailsender/forgotpasswordmail`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      useremail: email.value,
    }),
  })
    .then(async (res) => {
      const data = await res.json();
      isLoading.value = false;

      if (!data.message) {
        console.log(data);

        isRedirecting.value = true;
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        // alert(data.message || "Érvénytelen e-mail cím.");
        showSuccess(data.message);
      }
    })
    .catch((error) => {
      isLoading.value = false;
      console.error("Sikertelen e-mail küldés", error);
      alert("Valami hiba történt. Próbáld meg később!");
    });
}
</script>

<template>
  <div
    class="container d-flex justify-content-center align-items-center min-vh-100"
  >
    <div class="card p-4 shadow-lg login-card" style="width: 350px">
      <h3 class="text-center mb-4">Elfelejtett jelszó</h3>

      <transition name="fade">
        <div v-if="!isRedirecting" class="login-form">
          <div class="mb-3">
            <label for="email" class="form-label">E-mail cím</label>
            <input
              type="text"
              id="email"
              class="form-control"
              v-model="email"
            />
          </div>

          <div class="d-flex justify-content-center">
            <button
              class="btn btn-primary w-100"
              @click="EmailSend(UpdatePassword)"
              :disabled="isLoading"
            >
              <span v-if="isLoading">E-mail küldése...</span>
              <span v-else>Elfelejtett jelszó helyreállítása</span>
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

  <Toast />
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
