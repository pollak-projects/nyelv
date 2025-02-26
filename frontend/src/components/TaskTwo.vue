<script setup>
import InputText from "primevue/inputtext";
import { Button } from "primevue";
import ProgressBar from "primevue/progressbar";
import { onMounted, ref } from "vue";
import { GetCurrentTaskPair, GetUserLevel } from "../config/script";
import { getCookie, parseJwt } from "../lib/common.js";
import { GetUserProgress, SetProgress } from "../config/script";
import { router } from "../config/routes";

const isAnswerCorrect = ref(0);
const currentTaskLevel = ref("");
const currentTaskNumber = ref(1);
const currentTaskId = ref(1);
const selectPairHU = ref(0);
const selectPairEN = ref(-1);
const addProgress = ref(0);
const re = ref(null);
let NumberOfCorrectAnswers = ref(0);
const listLength = ref(0);
let progress = ref(0);
let mixedHUId = [];
let mixedHU = [];
const user = ref(null);

function RandomNumber(max) {
  return Math.floor(Math.random() * max);
}

onMounted(async () => {
  const userObj = parseJwt(getCookie("access_token"));
  user.value = userObj;
  if (userObj && userObj.username) {
    const progress = await GetUserProgress(userObj.username);
    if (progress != 25) {
      router.push("/tanfolyam")
    }
  }
  currentTaskLevel.value = await GetUserLevel(user.value.username);
  re.value = await GetCurrentTaskPair(currentTaskLevel.value);
  listLength.value = re.value.length;
  addProgress.value = (100 / re.value.length);
  for (let i = 0; i < re.value.length; i++) {}

  while (mixedHU.length < re.value.length) {
    let szam = RandomNumber(re.value.length);
    if (!mixedHU.includes(re.value[szam].magyar_par)) {
      mixedHU.push(re.value[szam].magyar_par);
      mixedHUId.push(re.value[szam].id);
    }
  }
  for (let i = 0; i < mixedHU.length; i++) {
    console.log(mixedHU[i]);
  }
});

function SelectPairHU(buttonId) {
  selectPairHU.value = document.getElementById("taskhu-" + buttonId).value;
  console.log(selectPairHU.value);
}
function SelectPairEN(buttonId) {
  selectPairEN.value = document.getElementById("tasken-" + buttonId).value;
  let elementHU = document.querySelector(
    "button[value='" + selectPairHU.value + "']"
  );
  let elementEN = document.querySelector(
    "button[value='" + selectPairEN.value + "']"
  );
  if (selectPairHU.value.slice(3) == selectPairEN.value.slice(3)) {
    console.log("Correct Answer");
    elementHU.remove();
    elementEN.remove();
    NumberOfCorrectAnswers.value++;
    progress.value += addProgress.value;
    isAnswerCorrect.value = 1;
    setTimeout(() => {
      if (NumberOfCorrectAnswers >= listLength.value) {
         
      }
      isAnswerCorrect.value = 0;
    }, 1000);
  } else {
    console.log("Incorrect Answer");
    selectPairHU.value = 0;
    isAnswerCorrect.value = 2;
    setTimeout(() => {
      isAnswerCorrect.value = 0;
    }, 1000);
  }
}
</script>

<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-100 p-10">
    <div class="w-full max-w-4xl bg-white shadow-2xl rounded-3xl p-10">
      <h1 class="text-5xl font-bold text-gray-800 text-center mb-12 pb-4">
        Angol Beginner
      </h1>
      <ProgressBar :value="progress" class="mb-6 h-6" />
      <p class="text-2xl text-gray-600 text-left">2. fejezet</p>

      <div class="mt-10">
        <div
          v-for="({ task }, index) in re"
          :key="index"
          class="text-center mb-6"
        >
          <div class="flex flex-row justify-between items-center">
            <Button
              :value="'HU-' + mixedHUId[index]"
              :label="mixedHU[index]"
              :id="'taskhu-' + mixedHU[index]"
              severity="info"
              class="w-28 h-16 text-xl"
              @click="SelectPairHU(mixedHU[index])"
            />
            <div class="flex-grow"></div>
            <Button
              :value="'EN-' + re[index].id"
              :label="re[index].angol_par"
              :id="'tasken-' + re[index].angol_par"
              severity="info"
              class="w-28 h-16 text-xl"
              @click="SelectPairEN(re[index].angol_par)"
            />
          </div>
        </div>
      </div>

      <div
        v-if="NumberOfCorrectAnswers >= listLength"
        class="mx-auto text-center align-middle mt-10"
      >
        <h1 class="text-4xl font-bold text-green-600">Siker!</h1>
      </div>
    </div>
  </div>

  <div
    v-if="isAnswerCorrect == 1"
    class="fixed bottom-0 left-0 w-full bg-emerald-400 h-52 flex flex-col items-center justify-center text-white"
  >
    <h1 class="text-3xl font-bold">Correct Answer</h1>
    <p class="text-xl"></p>
  </div>

  <div
    v-if="isAnswerCorrect == 2"
    class="fixed bottom-0 left-0 w-full bg-red-600 h-52 flex flex-col items-center justify-center text-white"
  >
    <h1 class="text-3xl font-bold">Incorrect Answer</h1>
    <p class="text-xl"></p>
  </div>
</template>

<style scoped></style>
