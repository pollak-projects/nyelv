<script setup>
import InputText from "primevue/inputtext";
import { Button } from "primevue";
import ProgressBar from "primevue/progressbar";
import { onMounted, ref } from "vue";
import { GetCurrentTaskListening } from "../config/script";

const isAnswerCorrect = ref(0);
const currentTaskId = ref("beginner");
const currentTaskNumber = ref(1);
const re = ref(null);
let correctAnswer = ref("");
let progress = ref(0);
let audioBlobUrl = ref("");

onMounted(async () => {
  re.value = await GetCurrentTaskListening(currentTaskId.value);

  // Convert Proxy to plain object/array
  const unwrappedData = [];

  for (let i = 0; i < 30045; i++) {
    const element = re.value[0].audio[i];
    unwrappedData.push(element);
  }
  console.log(re.value[0].audio); // This should give you the actual data

  // Now you can access the audio byte array safely
  const audioByteArray = unwrappedData;

  if (audioByteArray && audioByteArray.length > 0) {
    const audioBlob = new Blob([new Uint8Array(audioByteArray)], {
      type: "audio/mp3",
    });
    audioBlobUrl.value = URL.createObjectURL(audioBlob);
  } else {
    console.error("Audio data is empty or invalid.");
  }
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
      correctAnswer = re.value[currentTaskNumber.value - 1].valasz;
    }, 2000);
  } else {
    isAnswerCorrect.value = 2;
    progress.value += 20;
    setTimeout(() => {
      givenAnswer = "";
      isAnswerCorrect.value = 0;
      currentTaskNumber.value++;
      correctAnswer = re.value[currentTaskNumber.value - 1].valasz;
    }, 2000);
  }
}
</script>
<template>
  <h1>Angol Beginner</h1>
  <ProgressBar :value="progress"></ProgressBar>
  <p v-if="currentTaskNumber <= 5">
    1. fejezet {{ currentTaskNumber }}. feladat
  </p>
  <div class="mx-auto text-center align-middle" v-for="task in re">
    <span v-if="task.id == currentTaskNumber">
      <audio controls class="mx-auto text-center align-middle mb-3">
        <source :src="audioBlobUrl" type="audio/mp3" />
        Your browser does not support the audio tag.
      </audio>
      <InputText
        placeholder="Write your answer here..."
        id="answereBox"
        type="text"
        v-model="givenAnswer"
        variant="filled"
      />
      <Button @click="SubmitAnswer" label="Submit" severity="success" />
    </span>
  </div>
  <div v-if="currentTaskNumber > 5" class="mx-auto text-center align-middle">
    <h1>Siker!</h1>
  </div>

  <div
    v-if="isAnswerCorrect == 1"
    class="fixed-bottom bg-emerald-400 h-40 w-full"
  >
    <h1 class="mb-5">Correct Answer</h1>
    <p>Ide majd kiírjuk az összes mondatot.</p>
  </div>
  <div v-if="isAnswerCorrect == 2" class="fixed-bottom bg-red-600 h-40 w-full">
    <h1 class="mb-5">Incorrect Answer</h1>
    <p>Ide majd kiírjuk az összes mondatot.</p>
  </div>
</template>

<style scoped></style>
