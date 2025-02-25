<script setup>
import ProgressBar from "primevue/progressbar";
import { onMounted, ref } from "vue";
import { GetTaskThree } from "../config/script";
import draggable from "vuedraggable";

const hungaryanTexts = ref([]);
const currentTaskId = ref("beginner");
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

onMounted(async () => {
  re.value = await GetTaskThree(currentTaskId);
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
    progress.value += 20;
  } else if (listName2.length == 2 && listName1[0] != listName2[1]) {
    alert("Incorrect Answer");
  }
}

function ChangeTest(corrcetId, listName, listName2) {
  CheckTheMatch(corrcetId, listName, listName2);
}
</script>

<template>
  
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-center mb-4">Angol Beginner</h1>
      <ProgressBar :value="progress" class="mb-8"></ProgressBar>
      <p class="text-lg text-center mb-6">3. fejezet</p>

     
       

        <!-- Draggable Images -->
        <div class="col-span-2">
          <div class="space-y-6">
            <div
              v-if="!correctAnswers.includes('question1')"
              class="bg-white shadow-lg rounded-lg p-6"
              :onchange="ChangeTest('question1', correctAnswer1, question1)"
            >
              <draggable v-model="question1" tag="ul" group="meals" id="question1">
                <template #item="{ element: meal }">
                  <li class="flex justify-center">
                    <img :src="meal" alt="Question 1 Image" class="max-w-full h-auto rounded-lg" />
                  </li>
                </template>
              </draggable>
            </div>
<!--
            <div
              v-if="!correctAnswers.includes('question2')"
              class="bg-white shadow-lg rounded-lg p-6"
              :onchange="ChangeTest('question2', correctAnswer2, question2)"
            >
              <draggable v-model="question2" tag="ul" group="meals" id="question2">
                <template #item="{ element: meal }">
                  <li class="flex justify-center">
                    <img :src="meal" alt="Question 2 Image" class="max-w-full h-auto rounded-lg" />
                  </li>
                </template>
              </draggable>
            </div>

            <div
              v-if="!correctAnswers.includes('question3')"
              class="bg-white shadow-lg rounded-lg p-6"
              :onchange="ChangeTest('question3', correctAnswer3, question3)"
            >
              <draggable v-model="question3" tag="ul" group="meals" id="question3">
                <template #item="{ element: meal }">
                  <li class="flex justify-center">
                    <img :src="meal" alt="Question 3 Image" class="max-w-full h-auto rounded-lg" />
                  </li>
                </template>
              </draggable>
            </div>

            <div
              v-if="!correctAnswers.includes('question4')"
              class="bg-white shadow-lg rounded-lg p-6"
              :onchange="ChangeTest('question4', correctAnswer4, question4)"
            >
              <draggable v-model="question4" tag="ul" group="meals" id="question4">
                <template #item="{ element: meal }">
                  <li class="flex justify-center">
                    <img :src="meal" alt="Question 4 Image" class="max-w-full h-auto rounded-lg" />
                  </li>
                </template>
              </draggable>
            </div>

            <div
              v-if="!correctAnswers.includes('question5')"
              class="bg-white shadow-lg rounded-lg p-6"
              :onchange="ChangeTest('question5', correctAnswer5, question5)"
            >
              <draggable v-model="question5" tag="ul" group="meals" id="question5">
                <template #item="{ element: meal }">
                  <li class="flex justify-center">
                    <img :src="meal" alt="Question 5 Image" class="max-w-full h-auto rounded-lg" />
                  </li>
                </template>
              </draggable>
              -->
            </div>
          </div>
        </div>
      </div>


       <!-- Draggable Texts -->
<div class="bg-white shadow-lg rounded-lg p-6 text-center ">
  <draggable v-model="hungaryanTexts" tag="ul" group="meals" class="flex flex-wrap justify-center gap-3">
    <template #item="{ element: text }">
      <li class="p-4 text-lg  bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300">
        {{ text }}
      </li>
    </template>
  </draggable>
</div>



      <!-- Success Message -->
      <div v-if="progress == 100" class="mt-8 text-center">
        <h1 class="text-4xl font-bold text-green-600 mb-4">Siker!</h1>
        <p class="text-xl text-gray-700">Gratulálunk, minden feladatot sikeresen teljesítettél!</p>
      </div>
  <!--  </div> -->
 
</template>

<style scoped>
/* Additional custom styles if needed */
</style>