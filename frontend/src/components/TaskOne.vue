<script setup>
import InputText from 'primevue/inputtext';
import { Button } from "primevue";
import ProgressBar from 'primevue/progressbar';
import { onMounted, ref } from 'vue';
import { GetCurrentTask } from '../config/script';
import { router } from '../config/routes';


const isAnswerCorrect = ref(0);
const isAnswerWrong = ref(0);
const currentTaskId = ref("beginner");
const currentTaskNumber = ref(1);
const re = ref(null);
let correctAnswer = ref("");
let progress = ref(0);

onMounted(async () => {
re.value = await GetCurrentTask(currentTaskId.value);
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
            currentTaskNumber.value++;
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
      <h1 class="text-3xl font-bold text-gray-800 text-center mb-4">Angol Beginner</h1>
      <ProgressBar :value="progress"></ProgressBar>
      <p v-if="currentTaskNumber <= 5" class="text-lg text-gray-600 text-left">1. fejezet {{ currentTaskNumber }}. feladat</p>
      
      <div class="mt-6 bg-gray-50 p-4 rounded-lg shadow-md text-center" v-for="task in re" :key="task.id">
        <span v-if="task.id == currentTaskNumber">
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