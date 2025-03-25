<script setup>
import { Toolbar, Button, Avatar, Card, Timeline } from "primevue";
import { RouterLink } from "vue-router";
import ProgressBar from "primevue/progressbar";
import { onMounted, ref } from "vue";
import { getCookie, parseJwt } from "../lib/common.js";
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
const dailyWordGameGiven = ref(null);
const userLevel = ref(null);
const siker = ref(0);
const firstLetterCorrect = ref(false);
const secondLetterCorrect = ref(false);
const thirdLetterCorrect = ref(false);
const fourthLetterCorrect = ref(false);
const fifthLetterCorrect = ref(false);
const firstLetterContains = ref(false);
const secondLetterContains = ref(false);
const thirdLetterContains = ref(false);
const fourthLetterContains = ref(false);
const fifthLetterContains = ref(false);
const beginnerProgress = ref(0);
const intermediateProgress = ref(0);
const polyglotProgress = ref(0);

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
  dailyWordGame.value = "brisk";

  console.log(dailyWordGame.value.split(""));
});
/*
function SplitDailyWord(wordToSplit) {
  const splitWord = wordToSplit.split("");
  return splitWord;
}
*/
function CheckLetter() {
  let letter1 = document.getElementById("letter1").value;
  let letter2 = document.getElementById("letter2").value;
  let letter3 = document.getElementById("letter3").value;
  let letter4 = document.getElementById("letter4").value;
  let letter5 = document.getElementById("letter5").value;
  let dailyWordGameGiven = letter1 + letter2 + letter3 + letter4 + letter5;
  console.log(dailyWordGameGiven.split(""));
  CompareLetters(dailyWordGame.value.split(""), dailyWordGameGiven.split(""));
}

function redirectToAdmin() {
  window.location.replace("http://localhost:3300/admintable");
}

function CompareLetters(params, params2) {
  const word = params;
  const word2 = params2;
  /*
  for (let i = 0; i < word.length; i++) {
    if (word[i] == word2[i]) {
      console.log("Good job");
      
      console.log(siker)
      
    } else {
      console.log("Try again");
    }

     if (word[0] == word2[0]) {
      
      firstLetterCorrect.value = true
      
    } 

    if (word[1] == word2[1]) {
      
      secondLetterCorrect.value = true
      
    } 

    if (word[2] == word2[2]) {
      
      thirdLetterCorrect.value = true
      
    } 

    if (word[3] == word2[3]) {
      
     fourthLetterCorrect.value = true
      
    } 

    if (word[4] == word2[4]) {
      
      fifthLetterCorrect.value = true
      
    } 



   if (word.includes(word2[0]) ) {
      
    firstLetterContains.value = true
      
    } 

     if (word.includes(word2[1]) ) {
      
    secondLetterContains.value = true
      
    }


     if (word.includes(word2[2]) ) {
      
    thirdLetterContains.value = true
      
    }

     if (word.includes(word2[3]) ) {
      
    fourthLetterContains.value = true
      
    }

      if (word.includes(word2[4]) ) {
      
    fifthLetterContains.value = true
      
    }
    



  }*/
}
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
    <h1 class="text-3xl font-bold ps-4 pt-4">Üdv {{ user?.username }}!</h1>

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
    <div class="grid grid-cols-1 lg:grid-cols-1 gap-6 px-4 mt-8">
      <div class="bg-white shadow-lg rounded-lg p-6">
        <h2 class="text-xl font-bold mb-4">Találd ki a szót!</h2>
        <!--first row-->
        <input
          id="letter1"
          type="text"
          class="w-10 border border-gray-300 rounded-lg p-2"
          maxlength="1"
        />

        <input
          id="letter2"
          type="text"
          class="w-10 border border-gray-300 rounded-lg p-2"
          maxlength="1"
        />

        <input
          id="letter3"
          type="text"
          class="w-10 border border-gray-300 rounded-lg p-2"
          maxlength="1"
        />

        <input
          id="letter4"
          type="text"
          class="w-10 border border-gray-300 rounded-lg p-2"
          maxlength="1"
        />

        <input
          id="letter5"
          type="text"
          class="w-10 border border-gray-300 rounded-lg p-2"
          maxlength="1"
        />

        <button @click="CheckLetter">Send</button>
        <div
          v-if="
            firstLetterCorrect &&
            secondLetterCorrect &&
            thirdLetterCorrect &&
            fourthLetterCorrect &&
            fifthLetterCorrect
          "
        >
          Siker!
        </div>
        <div>
          <input
            v-if="firstLetterCorrect"
            id="letter1"
            type="text"
            class="w-10 border border-gray-300 rounded-lg p-2 bg-emerald-400"
            maxlength="1"
          />

          <input
            v-if="!firstLetterCorrect && !firstLetterContains"
            id="letter1"
            type="text"
            class="w-10 border border-gray-300 rounded-lg p-2 bg-red-600"
            maxlength="1"
          />

          <input
            v-if="firstLetterContains && !firstLetterCorrect"
            id="letter1"
            type="text"
            class="w-10 border border-gray-300 rounded-lg p-2 bg-amber-300"
            maxlength="1"
          />

          <input
            v-if="secondLetterCorrect"
            id="letter2"
            type="text"
            class="w-10 border border-gray-300 rounded-lg p-2 bg-emerald-400"
            maxlength="1"
          />

          <input
            v-if="!secondLetterCorrect && !secondLetterContains"
            id="letter2"
            type="text"
            class="w-10 border border-gray-300 rounded-lg p-2 bg-red-600"
            maxlength="1"
          />

          <input
            v-if="secondLetterContains && !secondLetterCorrect"
            id="letter1"
            type="text"
            class="w-10 border border-gray-300 rounded-lg p-2 bg-amber-300"
            maxlength="1"
          />

          <input
            v-if="thirdLetterCorrect"
            id="letter3"
            type="text"
            class="w-10 border border-gray-300 rounded-lg p-2 bg-emerald-400"
            maxlength="1"
          />

          <input
            v-if="!thirdLetterCorrect && !thirdLetterContains"
            id="letter3"
            type="text"
            class="w-10 border border-gray-300 rounded-lg p-2 bg-red-600"
            maxlength="1"
          />

          <input
            v-if="thirdLetterContains && !thirdLetterCorrect"
            id="letter1"
            type="text"
            class="w-10 border border-gray-300 rounded-lg p-2 bg-amber-300"
            maxlength="1"
          />

          <input
            v-if="fourthLetterCorrect"
            id="letter4"
            type="text"
            class="w-10 border border-gray-300 rounded-lg p-2 bg-emerald-400"
            maxlength="1"
          />

          <input
            v-if="!fourthLetterCorrect && !fourthLetterContains"
            id="letter4"
            type="text"
            class="w-10 border border-gray-300 rounded-lg p-2 bg-red-600"
            maxlength="1"
          />

          <input
            v-if="fourthLetterContains && !fourthLetterCorrect"
            id="letter1"
            type="text"
            class="w-10 border border-gray-300 rounded-lg p-2 bg-amber-300"
            maxlength="1"
          />

          <input
            v-if="fifthLetterCorrect"
            id="letter5"
            type="text"
            class="w-10 border border-gray-300 rounded-lg p-2 bg-emerald-400"
            maxlength="1"
          />

          <input
            v-if="!fifthLetterCorrect && !fifthLetterContains"
            id="letter5"
            type="text"
            class="w-10 border border-gray-300 rounded-lg p-2 bg-red-600"
            maxlength="1"
          />

          <input
            v-if="fifthLetterContains && !fifthLetterCorrect"
            id="letter1"
            type="text"
            class="w-10 border border-gray-300 rounded-lg p-2 bg-amber-300"
            maxlength="1"
          />
        </div>
      </div>

      <!-- Progress Card -->
      <Card class="shadow-lg rounded-lg">
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
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-between items-center">
          <div class="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener"
              class="hover:text-gray-400"
              >Facebook</a
            >
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener"
              class="hover:text-gray-400"
              >Twitter</a
            >
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener"
              class="hover:text-gray-400"
              >Instagram</a
            >
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
</style>
