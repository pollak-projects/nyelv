<script setup>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import ProgressBar from "primevue/progressbar";
import { onMounted, ref } from "vue";
import { GetCurrentTaskListening, UpdateUserLevel, GetUserProgress, SetProgress, GetUserLevel, LifeCheck, LifeKill } from "../config/script";
import { getCookie, parseJwt } from "../lib/common.js";
import { router } from "../config/routes";

const isAnswerCorrect = ref(0);
const currentTaskLevel = ref("beginner");
const currentTaskNumber = ref(1);
const maxTaskNumber = ref(5);
const currentTaskId = ref(1);
const re = ref(null);
let correctAnswer = ref("");
let progress = ref(0);
let audioBlobUrl = ref("");
const user = ref(null);
const userLevel = ref(null);
const levelTitle = ref("Angol ");
const lifesRemaining = ref([1, 1, 1])

onMounted(async () => {
  const userObj = parseJwt(getCookie("access_token"));
  user.value = userObj;
  if (userObj && userObj.username) {
    console.log(userObj);
    const progress = await GetUserProgress(userObj.sub);
    userLevel.value = await GetUserLevel(userObj.sub);
    currentTaskLevel.value = await GetUserLevel(user.value.sub);
    levelTitle.value += currentTaskLevel.value
    if (progress === 75 || progress === 175 || progress === 275) {
      router.push("/taskfour")
    }
    else {
      router.push("/tanfolyam");
    }
  }

  re.value = await GetCurrentTaskListening(currentTaskLevel.value);
  currentTaskId.value = re.value[currentTaskNumber.value-1].id;
  maxTaskNumber.value = re.value.length;
});

function GetCorrectAudio(taskNumber) {
  const audioByteArray = Object.values(re.value[taskNumber-1].audio);
  correctAnswer.value = re.value[taskNumber-1].valasz;
  console.log(correctAnswer.value);


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
      currentTaskId.value++;
      givenAnswer = "";
      isAnswerCorrect.value = 0;
      currentTaskNumber.value++;

      if (currentTaskNumber.value > maxTaskNumber.value) 
      {
        if (userLevel.value == "polyglot_master") {
          SetProgress(user.value.sub, 25);
          
        } else {
        SetProgress(user.value.sub, -75);
        UpdateUserLevel(user.value.sub, userLevel.value);
        }

      }
    }, 2000);
  } else {
    isAnswerCorrect.value = 2;
    progress.value += 20;
    LifeKill(lifesRemaining.value);
    if(LifeCheck(lifesRemaining.value) == 0){
      alert("Vége van kicsi")

      router.push("/tanfolyam")
    } 
    setTimeout(() => {
      currentTaskId.value++;
      givenAnswer = "";
      isAnswerCorrect.value = 0;
      currentTaskNumber.value++;

      if (currentTaskNumber.value > maxTaskNumber.value) 
      {
        if (userLevel.value == "polyglot_master") {
          SetProgress(user.value.sub, 25);
          
        } else {
        SetProgress(user.value.sub, -75);
        UpdateUserLevel(user.value.sub, userLevel.value);
        }

      }
    }, 2000);
  }

 
}
</script>

<template>
  <div class="flex bg-gray-100"><span v-for="items in lifesRemaining" class="pl-3 pt-2"><img v-if="items == 1" src="../assets/HeartLive.png" alt=""> <img v-if="items == 0" src="../assets/HeartDead.png" alt=""></span> </div>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="flex flex-col items-center">
    <div class="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6">
      <h1 class="text-3xl font-bold text-gray-800 text-center mb-4">
        {{ levelTitle }}
      </h1>
      <ProgressBar :value="progress"></ProgressBar>
      <p v-if="currentTaskNumber <= 5" class="text-lg text-gray-600 text-left">
        4. fejezet {{ currentTaskNumber}}. feladat
      </p>

      <div
        class="mt-6 bg-gray-50 p-4 rounded-lg shadow-md text-center"
        v-for="task in re"
        :key="task.id"
      >
        <div v-if="task.id == currentTaskId" class="space-y-6">

          <audio controls class="w-full">
            <source :src="GetCorrectAudio(currentTaskNumber)" type="audio/mp3" />
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
    </div>
      <div
        v-if="currentTaskNumber > maxTaskNumber"
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

    
  </div>
  <div
      v-if="isAnswerCorrect == 1"
      class="w-full fixed bottom-0 bg-emerald-400 h-40 flex flex-col items-center justify-center"
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
</template>

<style scoped></style>
