<script setup>
import ProgressBar from "primevue/progressbar";
import { onMounted, ref } from "vue";
import { GetTaskThree } from "../config/script";
import draggable from "vuedraggable";
import { GetUserProgress, SetProgress, GetUserLevel } from "../config/script";
import { getCookie, parseJwt } from "../lib/common.js";
import { router } from "../config/routes";

const hungaryanTexts = ref([]);
const currentTaskId = ref("beginner");
const currentNumber = ref(1);
const question1 = ref([]);
const question2 = ref([]);
const question3 = ref([]);
const question4 = ref([]);
const question5 = ref([]);

const correctAnswer1 = ref([]);
const correctAnswer2 = ref([]);
const correctAnswer3 = ref([]);
const correctAnswer4 = ref([]);
const correctAnswer5 = ref([]);
const re = ref();
let progress = ref(0);
const user = ref(null);
const levelTitle = ref("Angol Beginner");

onMounted(async () => {
  const userObj = parseJwt(getCookie("access_token"));
  user.value = userObj;
  if (userObj && userObj.username) {
    const progress = await GetUserProgress(user.value.sub);
    currentTaskId.value = await GetUserLevel(user.value.sub);
    console.log(currentTaskId.value);
    if (progress === 150) {
      levelTitle.value = "Angol Intermediate";
    }
    else if (progress === 250) {
      levelTitle.value = "Angol Polyglot Master";
    }
    if (progress === 50 || progress === 150 || progress === 250) {
      router.push("/taskthree")
    }
    else {
      router.push("/tanfolyam");
    }
  }

  re.value = await GetTaskThree(currentTaskId.value);
  for (let i = 0; i < re.value.length; i++) {
    hungaryanTexts.value.push(re.value[i].text);
  }
  question1.value.push(re.value[0].image);
  correctAnswer1.value.push(re.value[0].text);
  question2.value.push(re.value[1].image);
  correctAnswer2.value.push(re.value[1].text);
  question3.value.push(re.value[2].image);
  correctAnswer3.value.push(re.value[2].text);
  question4.value.push(re.value[3].image);
  correctAnswer4.value.push(re.value[3].text);
  question5.value.push(re.value[4].image);
  correctAnswer5.value.push(re.value[4].text);
});


const correctAnswers = ref([]);

function CheckTheMatch(corrcetId, listName1, listName2) {
  if (listName1[0] == listName2[1] && listName2.length == 2) {
    alert("Correct Answer");
    correctAnswers.value.push(corrcetId);
    currentNumber.value += 1;
    if (currentNumber.value > 5) {
      console.log("Task Completed");
                SetProgress(user.value.sub, 25);
    }
    progress.value += 20;
  } else if (listName2.length == 2 && listName1[0] != listName2[1]) {
    correctAnswers.value.push(corrcetId);
    console.log(listName1[0]);
    hungaryanTexts.value.reduceRight((acc, item, index) => {
      if (item === listName1[0]) {
        hungaryanTexts.value.splice(index, 1);
      }
    }, 0);
    hungaryanTexts.value.push(listName2[1]);
    currentNumber.value += 1;
    alert("Incorrect Answer");
    progress.value += 20;
  }
}

function ChangeTest(corrcetId, listName, listName2) {
  CheckTheMatch(corrcetId, listName, listName2);
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-center mb-4">{{ levelTitle }}</h1>
      <ProgressBar :value="progress" class="mb-8"></ProgressBar>
      <p class="text-lg text-center mb-6">3. fejezet</p>

      <!-- Draggable Images -->
      <div class="col-span-2">
        <div class="space-y-4">
          <div
            v-if="!correctAnswers.includes('question1')"
            class="bg-white shadow-lg rounded-lg p-6"
            :onchange="ChangeTest(`question${currentNumber}`, correctAnswer1, question1)"
          >
            <draggable
              v-model="question1"
              tag="ul"
              group="meals"
              :id="'question' + currentNumber"
            >
              <template #item="{ element: meal }">
                <li class="flex justify-center">
                  <img
                    :src="meal"
                    alt="Question 1 Image"
                    class="max-w-full h-auto rounded-lg"
                  />
                </li>
              </template>
            </draggable>
          </div>

          <div
            v-if="currentNumber == 2"
            class="bg-white shadow-lg rounded-lg p-6"
            :onchange="ChangeTest(`question2`, correctAnswer2, question2)"
          >
            <draggable
              v-model="question2"
              tag="ul"
              group="meals"
              :id="'question' + currentNumber"
            >
              <template #item="{ element: meal }">
                <li class="flex justify-center">
                  <img
                    :src="meal"
                    alt="Question 1 Image"
                    class="max-w-full h-auto rounded-lg"
                  />
                </li>
              </template>
            </draggable>
          </div>

          <div
            v-if="currentNumber == 3"
            class="bg-white shadow-lg rounded-lg p-6"
            :onchange="ChangeTest(`question3`, correctAnswer3, question3)"
          >
            <draggable
              v-model="question3"
              tag="ul"
              group="meals"
              :id="'question' + currentNumber"
            >
              <template #item="{ element: meal }">
                <li class="flex justify-center">
                  <img
                    :src="meal"
                    alt="Question 1 Image"
                    class="max-w-full h-auto rounded-lg"
                  />
                </li>
              </template>
            </draggable>
          </div>

          <div
            v-if="currentNumber == 4"
            class="bg-white shadow-lg rounded-lg p-6"
            :onchange="ChangeTest(`question4`, correctAnswer4, question4)"
          >
            <draggable
              v-model="question4"
              tag="ul"
              group="meals"
              :id="'question' + currentNumber"
            >
              <template #item="{ element: meal }">
                <li class="flex justify-center">
                  <img
                    :src="meal"
                    alt="Question 1 Image"
                    class="max-w-full h-auto rounded-lg"
                  />
                </li>
              </template>
            </draggable>
          </div>

          <div
            v-if="currentNumber == 5"
            class="bg-white shadow-lg rounded-lg p-6"
            :onchange="ChangeTest(`question5`, correctAnswer5, question5)"
          >
            <draggable
              v-model="question5"
              tag="ul"
              group="meals"
              :id="'question' + currentNumber"
            >
              <template #item="{ element: meal }">
                <li class="flex justify-center">
                  <img
                    :src="meal"
                    alt="Question 1 Image"
                    class="max-w-full h-auto rounded-lg"
                  />
                </li>
              </template>
            </draggable>
          </div>
          
        </div>
      </div>
    </div>
  </div>

  <!-- Draggable Texts -->
  <div class="bg-white shadow-lg rounded-lg p-6 text-center">
    <draggable
      v-model="hungaryanTexts"
      tag="ul"
      group="meals"
      class="flex flex-wrap justify-center gap-3"
    >
      <template #item="{ element: text }">
        <li
          class="p-4 text-lg bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300"
        >
          {{ text }}
        </li>
      </template>
    </draggable>
  </div>

  <!-- Success Message -->
  <div v-if="progress == 100" class="mt-8 text-center">
    <h1 class="text-4xl font-bold text-green-600 mb-4">Siker!</h1>
    <p class="text-xl text-gray-700">
      Gratulálunk, minden feladatot sikeresen teljesítettél!
    </p>
  </div>
  <!--  </div> -->
</template>

<style scoped>
/* Additional custom styles if needed */
</style>
