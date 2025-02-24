<script setup>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import ProgressBar from "primevue/progressbar";
import { onMounted, ref } from "vue";
import { GetCurrentTaskListening } from "../config/script";

const isAnswerCorrect = ref(0);
const currentTaskId = ref("beginner");
const currentTaskNumber = ref(0);
const re = ref(null);
let correctAnswer = ref("");
let progress = ref(0);
let audioBlobUrl = ref("");

onMounted(async () => {
  re.value = await GetCurrentTaskListening(currentTaskId.value);
});

function GetCorrectAudio(taskNumber) {
  const audioByteArray = Object.values(re.value[taskNumber].audio);
  correctAnswer.value = re.value[taskNumber].valasz;

  console.log(audioByteArray);

  if (audioByteArray && audioByteArray.length > 0) {
    const audioBlob = new Blob([new Uint8Array(audioByteArray)], {
      type: "audio/mp3",
    });
    return URL.createObjectURL(audioBlob);
  } else {
    console.error("Audio data is empty or invalid.");
  }
}

function SubmitAnswer() {
  let givenAnswer = document.getElementById("answereBox").value;
  console.log(correctAnswer.value);
  if (givenAnswer == correctAnswer.value) {
    isAnswerCorrect.value = 1;
    progress.value += 20;
    setTimeout(() => {
      givenAnswer = "";
      isAnswerCorrect.value = 0;
      currentTaskNumber.value++;
    }, 2000);
  } else {
    isAnswerCorrect.value = 2;
    progress.value += 20;
    setTimeout(() => {
      givenAnswer = "";
      isAnswerCorrect.value = 0;
      currentTaskNumber.value++;
    }, 2000);
  }

  unwrappedData = [];
  for (let i = 0; i < 31000; i++) {
    try {
      const element = re.value[currentTaskNumber.value].audio[i];
      unwrappedData.push(element);
    } catch (error) {
      break;
    }
  }
}
</script>

<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-100 p-6">
    <div class="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6">
      <h1 class="text-3xl font-bold text-gray-800 text-center mb-4">
        Angol Beginner
      </h1>
      <ProgressBar :value="progress"></ProgressBar>
      <p v-if="currentTaskNumber <= 5" class="text-lg text-gray-600 text-left">
        4. fejezet {{ currentTaskNumber + 1 }}. feladat
      </p>

      <div
        class="mt-6 bg-gray-50 p-4 rounded-lg shadow-md text-center"
        v-for="task in re"
        :key="task.id"
      >
        <div v-if="task.id - 1 == currentTaskNumber" class="space-y-6">
          <audio controls class="w-full">
            <source :src="GetCorrectAudio(task.id - 1)" type="audio/mp3" />
            Your browser does not support the audio tag.
          </audio>
          <InputText
            placeholder="Write your answer here..."
            id="answereBox"
            type="text"
            variant="filled"
            class="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            @click="SubmitAnswer"
            label="Submit"
            severity="success"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          />
        </div>
      </div>

      <div
        v-if="currentTaskNumber + 1 > 5"
        class="mx-auto text-center align-middle"
      >
        <h1 class="text-2xl font-bold text-green-600">Siker!</h1>
        <RouterLink to="/main">
          <Button
            label="Vissza a főoldalra"
            severity="info"
            variant="text"
            class="mt-2"
          />
        </RouterLink>
      </div>
    </div>

    <div
      v-if="isAnswerCorrect == 1"
      class="fixed bottom-0 bg-emerald-400 h-40 w-full flex flex-col items-center justify-center"
    >
      <h1 class="text-2xl font-bold text-white">Correct Answer</h1>
      <p class="text-white">Ide majd kiírjuk az összes mondatot.</p>
    </div>
    <div
      v-if="isAnswerCorrect == 2"
      class="fixed bottom-0 bg-red-600 h-40 w-full flex flex-col items-center justify-center"
    >
      <h1 class="text-2xl font-bold text-white">Incorrect Answer</h1>
      <p class="text-white">Ide majd kiírjuk az összes mondatot.</p>
    </div>
  </div>
</template>

<style scoped></style>
