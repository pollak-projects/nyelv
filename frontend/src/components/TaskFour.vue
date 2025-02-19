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
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-center mb-8">Angol Beginner</h1>
      <ProgressBar :value="progress" class="mb-8"></ProgressBar>
      <p v-if="currentTaskNumber <= 5" class="text-lg text-center mb-6">
        1. fejezet {{ currentTaskNumber + 1 }}. feladat
      </p>
      <div
        class="bg-white shadow-lg rounded-lg p-6"
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
            class="w-full"
          />
          <Button
            @click="SubmitAnswer"
            label="Submit"
            severity="success"
            class="w-full"
          />
        </div>
      </div>
      <div
        v-if="currentTaskNumber + 1 > 5"
        class="text-center mt-8 bg-green-100 p-6 rounded-lg"
      >
        <h1 class="text-2xl font-bold text-green-700">Siker!</h1>
      </div>

      <div
        v-if="isAnswerCorrect == 1"
        class="fixed bottom-0 left-0 right-0 bg-emerald-400 p-6 text-white text-center"
      >
        <h1 class="text-2xl font-bold mb-3">Correct Answer</h1>
        <p>Ide majd kiírjuk az összes mondatot.</p>
      </div>
      <div
        v-if="isAnswerCorrect == 2"
        class="fixed bottom-0 left-0 right-0 bg-red-600 p-6 text-white text-center"
      >
        <h1 class="text-2xl font-bold mb-3">Incorrect Answer</h1>
        <p>Ide majd kiírjuk az összes mondatot.</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>