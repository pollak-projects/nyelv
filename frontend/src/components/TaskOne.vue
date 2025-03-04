<script setup>
import InputText from 'primevue/inputtext';
import { Button } from "primevue";
import ProgressBar from 'primevue/progressbar';
import { onMounted, ref } from 'vue';
import { getCookie, parseJwt } from "../lib/common.js";
import { GetCurrentTask, SetProgress, GetUserLevel, GetUserProgress } from '../config/script';
import { router } from '../config/routes';

const isAnswerCorrect = ref(0);
const isAnswerWrong = ref(0);
const currentTaskLevel = ref("");
const currentTaskNumber = ref(1);
const currentTaskId = ref(1);
const re = ref(null);
let correctAnswer = ref("");
let progress = ref(0);
const user = ref(null);
const level = ref(null);
const levelTitle = ref("Angol Beginner");

onMounted(async () => {
  const userObj = parseJwt(getCookie("access_token"));
  user.value = userObj;
  if (userObj) {
    const progress = await GetUserProgress(userObj.sub);
    if (progress === 100) {
      levelTitle.value = "Angol Intermediate";
    }
    else if (progress === 200) {
      levelTitle.value = "Angol Polyglot Master";
    }
    if (progress === 0 || progress === 100 || progress === 200) {
      router.push("/taskone")
    }
    else {
      router.push("/tanfolyam");
    }
  }


currentTaskLevel.value = await GetUserLevel(user.value.sub);
re.value = await GetCurrentTask(currentTaskLevel.value);
currentTaskId.value = re.value[currentTaskNumber.value-1].id;
correctAnswer = re.value[currentTaskNumber.value-1].valasz;

});


function SubmitAnswer() {
    let givenAnswer = document.getElementById("answereBox").value;

    if (givenAnswer == correctAnswer) {
        isAnswerCorrect.value = 1;
        progress.value += 20;
        setTimeout(() => {
            givenAnswer = "";
            isAnswerCorrect.value = 0;
            currentTaskNumber.value++;
            currentTaskId.value++;
            if (currentTaskNumber.value > 5) {
                SetProgress(user.value.sub, 25);
            }
            correctAnswer = re.value[currentTaskNumber.value-1].valasz;
        }, 2000);
    } else {
        isAnswerCorrect.value = 2;
        progress.value += 20;
        setTimeout(() => {
            givenAnswer = "";
            isAnswerCorrect.value = 0;
            isAnswerWrong.value += 1;
            CheckLife();
            console.log(currentTaskNumber.value);
            if (currentTaskNumber.value >= 5) {
                SetProgress(user.value.sub, 25);
            }
            currentTaskNumber.value++;
            currentTaskId.value++;
            correctAnswer = re.value[currentTaskNumber.value-1].valasz;
        }, 2000);
    }

}

function CheckLife() {
    if (isAnswerWrong.value == 3) {
        alert("Vesztettél!");
        router.push("/tanfolyam");
    }
}
</script>

<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-100 p-6">
    <div class="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6">
      <h1 class="text-3xl font-bold text-gray-800 text-center mb-4">{{ levelTitle }}</h1>
      <ProgressBar :value="progress"></ProgressBar>
      <p v-if="currentTaskNumber <= 5" class="text-lg text-gray-600 text-left">1. fejezet {{ currentTaskNumber }}. feladat</p>
      
      <div class="mt-6 bg-gray-50 p-4 rounded-lg shadow-md text-center" v-for="task in re" :key="task.id">
        <span v-if="task.id == currentTaskId">
          <h4 class="mb-5 text-xl font-semibold text-gray-700">{{ task.kerdes }}</h4>
          <InputText placeholder="Write your answer here..." id="answereBox" type="text" variant="filled" class="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <Button @click="SubmitAnswer" label="Submit" severity="success" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition" />
        </span>
      </div>

      <div v-if="currentTaskNumber > 5" class="mx-auto text-center align-middle">
        <h1 class="text-2xl font-bold text-green-600">Siker!</h1>
        <RouterLink to="/tasktwo">
          <Button label="Jöhet a következő fejezet!" severity="success" variant="text" class="mt-2" />
        </RouterLink>
        <RouterLink to="/main">
          <Button label="Vissza a főoldalra" severity="info" variant="text" class="mt-2" />
        </RouterLink>
      </div>
    </div>
    
    <div v-if="isAnswerCorrect == 1" class="fixed bottom-0 bg-emerald-400 h-40 w-full flex flex-col items-center justify-center">
      <h1 class="text-2xl font-bold text-white">Correct Answer</h1>
      <p class="text-white">Ide majd kiírjuk az összes mondatot.</p>
    </div>
    <div v-if="isAnswerCorrect == 2" class="fixed bottom-0 bg-red-600 h-40 w-full flex flex-col items-center justify-center">
      <h1 class="text-2xl font-bold text-white">Incorrect Answer</h1>
      <p class="text-white">Ide majd kiírjuk az összes mondatot.</p>
    </div>
  </div>
</template>

<style scoped>

</style>