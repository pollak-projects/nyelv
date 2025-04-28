<script setup>
import { Toolbar, Button, Avatar, Card, Timeline } from "primevue";
import { RouterLink } from "vue-router";
import ProgressBar from "primevue/progressbar";
import { onMounted, ref } from "vue";
import { getCookie, parseJwt } from "../lib/common.js";
import {GetRandomWordGame, GetRandomWordGameNew} from "../config/script.js";
import {
  Logout,
  GetUserProgress,
  GetUserLevel,
  GetDailyWord,
} from "../config/script.js";

const Logout2 = () => {
  Logout();
};

const user = ref(null);
const level = ref(null);
const dailyWordHU = ref(null);
const dailyWordENG = ref(null);
const dailyWordGame = ref(null);
const userLevel = ref(null);
const siker = ref(0);
const beginnerProgress = ref(0);
const intermediateProgress = ref(0);
const polyglotProgress = ref(0);
const curentrow = ref(1);


onMounted(async () => {
  const userObj = parseJwt(getCookie("access_token"));
  user.value = userObj;
  if (userObj && userObj.username) {
    const progress = await GetUserProgress(user.value.sub);
    const level = await GetUserLevel(user.value.sub);
    user.value.user_current_progress = progress;
    user.value.level = level;
  }
  userLevel.value = user.value.level;

  if (userLevel.value == "beginner") {
    beginnerProgress.value = user.value.user_current_progress;
  } else if (userLevel.value == "intermediate") {
    beginnerProgress.value = 100;
    intermediateProgress.value = user.value.user_current_progress;
  } else if (userLevel.value == "polyglot_master") {
    beginnerProgress.value = 100;
    intermediateProgress.value = 100;
    polyglotProgress.value = user.value.user_current_progress;
  }

  level.value = await GetUserLevel(userObj.sub);
  const dailyWord = await GetDailyWord();
  dailyWordHU.value = dailyWord[1];
  dailyWordENG.value = dailyWord[0];
  let lastWord = await GetRandomWordGame();
  let today = new Date().toISOString().slice(0, 10);
  let lastUsedDate = lastWord[0].used_date.slice(0, 10);
  if (lastUsedDate != today) {
    dailyWordGame.value = await GetRandomWordGameNew()
  }else if(lastUsedDate == today){
    dailyWordGame.value = lastWord[0].word;
  }
});

function SplitDailyWord(wordToSplit) {
  const splitWord = wordToSplit.split("");
  return splitWord;
}

function redirectToAdmin() {
  window.location.replace("http://localhost:3300/admintable");
}

function CompareLetters(row) {
  let dailyword = SplitDailyWord(dailyWordGame.value);
  let givenWord = [];
  let numbersOfCorrectLetters = 0;
  for (let i = 0; i < 5; i++) {
    givenWord[i] = document.getElementById("letter" + (i + 1) + row).value;
  }
  for (let i = 0; i < dailyword.length; i++) {
    if (dailyword.includes(givenWord[i]) && dailyword[i] != givenWord[i]) {
      document
        .getElementById("letter" + (i + 1) + row)
        .classList.add("partial");
      document.getElementById("letter" + (i + 1) + row).disabled = true;
    } else if (dailyword[i] == givenWord[i]) {
      numbersOfCorrectLetters++;
      document
        .getElementById("letter" + (i + 1) + row)
        .classList.add("correct");
      document.getElementById("letter" + (i + 1) + row).disabled = true;
    } else {
      document
        .getElementById("letter" + (i + 1) + row)
        .classList.add("incorrect");
      document.getElementById("letter" + (i + 1) + row).disabled = true;
    }
  }
  if (numbersOfCorrectLetters == 5) {
    console.log("Siker!");
    siker.value = 1;
  } else {
    curentrow.value++;
  }

  if (curentrow.value > 5) {
    siker.value = 2;
  }
}

const moveToNext = (input, row) => {
  let inputBox = document.getElementById("letter" + input + row).value;
  if (inputBox.length == 1 && input < 5) {
    document.getElementById("letter" + (input + 1) + row).focus();
  } else if (inputBox.length == 0) {
    document.getElementById("letter" + (input - 1) + row).focus();
  } else if (input == 5) {
    CompareLetters(row);
    document.getElementById("letter1" + (row+1)).focus();
  }
};
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
          <RouterLink to="/chat"><Button label="Chat" text plain /></RouterLink>
          <RouterLink to="/tanfolyam"
            ><Button label="Tanfolyamok" text plain
          /></RouterLink>
          <template v-if="user?.user_role === 'admin'">
            <RouterLink>
              <Button @click="redirectToAdmin" label="Admin" text plain />
            </RouterLink>
          </template>
          <template v-if="user?.user_role === 'moderator'">
            <RouterLink>
              <Button @click="redirectToAdmin" label="Moderator" text plain />
            </RouterLink>
          </template>
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
    <h1 class="text-3xl font-bold ps-4 pt-4">Üdv {{ user?.username }}! {{ dailyWordGame }}</h1>

    <!-- Course Cards -->
    <div class="flex gap-6 px-4 mt-8 justify-evenly flex-wrap">
      <Card class="shadow-lg rounded-lg overflow-hidden w-1/3 min-w-72">
        <template #header>
          <img
            alt="English Course"
            src="../assets/england.png"
            class="w-full h-48 object-cover"
          />
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
          <img
            alt="Discombobulate"
            src="../assets/napiszobackground.png"
            class="w-full h-48 object-cover"
          />
        </template>
        <template #title>
          <span v-if="dailyWordENG">{{ dailyWordENG }} </span>
          <span v-if="!dailyWordENG" class="loader"></span
        ></template>
        <template #subtitle>{{ dailyWordHU }}</template>
      </Card>
    </div>

    <!-- Word game  -->

    <Card class="shadow-lg rounded-lg mt-4">
      <template #title>Találd ki a szót!</template>
      <template #content>
        <div class="flex justify-center">
        <div class="flex flex-col">
          <div v-for="(row, index) in 5" class="pb-2" v-if="siker == 0">
            <!--first row-->
            <input
              v-for="(letter, index) in 5"
              :id="'letter' + letter + row"
              type="text"
              class="dark: bg-white dark:text-black w-10 border border-gray-300 rounded-lg p-2 me-1"
              maxlength="1"
              @input="moveToNext(letter, row)"
            />
          </div>
        </div>
        </div>
        <div v-if="siker == 1">Siker!</div>
        <div v-if="siker == 2">
          Sajnos most nem sikerült, próbáld újra később!
          <h4 class="flex flex-col items-center">
            A szó a {{ dailyWordGame }} volt.
          </h4>
        </div>
      </template>
    </Card>
    <!-- Progress Card -->
    <Card class="shadow-lg rounded-lg mt-4">
      <template #title>A jelenlegi haladásod:</template>
      <template #subtitle>Remek munka!</template>
      <template #content>
        <div class="space-y-4">
          <div>
            <h4 class="font-semibold">Beginner</h4>
            <ProgressBar :value="beginnerProgress" class="mt-2" />
          </div>
          <hr />
          <div>
            <h4 class="font-semibold">Intermediate</h4>
            <ProgressBar :value="intermediateProgress" class="mt-2" />
          </div>
          <hr />
          <div>
            <h4 class="font-semibold">Polyglot master</h4>
            <ProgressBar :value="polyglotProgress" class="mt-2" />
          </div>
        </div>
      </template>
    </Card>
  </div>

  <!-- Footer -->
  <footer class="bg-gray-800 text-white mt-8 py-6">
    <div class="ms-5">&copy; 2025 Your Company. All rights reserved.</div>
  </footer>
</template>

<style scoped>
.loader {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: block;
  margin: 15px auto;
  position: relative;
  background: #fff;
  box-shadow: -24px 0 #fff, 24px 0 #fff;
  box-sizing: border-box;
  animation: shadowPulse 2s linear infinite;
}

@keyframes shadowPulse {
  33% {
    background: #fff;
    box-shadow: -24px 0 #10b981, 24px 0 #fff;
  }
  66% {
    background: #10b981;
    box-shadow: -24px 0 #fff, 24px 0 #fff;
  }
  100% {
    background: #fff;
    box-shadow: -24px 0 #fff, 24px 0 #10b981;
  }
}

.correct {
  background-color: green !important;
  color: white;
}

.partial {
  background-color: yellow !important;
  color: black;
}

.incorrect {
  background-color: red !important;
  color: white;
}
</style>
