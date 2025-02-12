<script setup>
import InputText from "primevue/inputtext";
import { Button } from "primevue";
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
  if (givenAnswer == correctAnswer.value  ) {
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
  <h1>Angol Beginner</h1>
  <ProgressBar :value="progress"></ProgressBar>
  <p v-if="currentTaskNumber <= 5">
    1. fejezet {{ currentTaskNumber+1 }}. feladat
  </p>
  <div class="mx-auto text-center align-middle" v-for="task in re">
    <span v-if="task.id-1 == currentTaskNumber">
      <audio controls class="mx-auto text-center align-middle mb-3">
        <source :src="GetCorrectAudio(task.id-1)" type="audio/mp3" />
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
  <div v-if="currentTaskNumber+1 > 5" class="mx-auto text-center align-middle">
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
