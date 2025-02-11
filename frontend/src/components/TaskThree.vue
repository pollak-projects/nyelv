<script setup>
import InputText from "primevue/inputtext";
import { Button } from "primevue";
import ProgressBar from "primevue/progressbar";
import { onMounted, ref } from "vue";
import { GetTaskThree } from "../config/script";
import draggable from "vuedraggable";

const isAnswerCorrect = ref();
const hungaryanTexts = ref([]);
const currentTaskId = ref("beginner");
const question1 = ref([]);
const question2 = ref([]);
const question3 = ref([]);
const question4 = ref([]);
const question5 = ref([]);
const re = ref();
let progress = ref(0);

onMounted(async () => {
  re.value = await GetTaskThree(currentTaskId);
  for (let i = 0; i < re.value.length; i++) {
    hungaryanTexts.value.push(re.value[i].text);
  }
  question1.value.push(re.value[0].text);
  question2.value.push(re.value[1].text);
  question3.value.push(re.value[2].text);
  question4.value.push(re.value[3].text);
  question5.value.push(re.value[4].text);
});

const correctAnswers = ref([]);


function CheckTheMatch(corrcetId, listName) {
  if (listName[0] == listName[1] && listName.length == 2) {
    alert("Correct Answer");
    console.log(corrcetId);
    correctAnswers.value.push(corrcetId);
    progress.value += 20;
  } else if (listName.length == 2 && listName[0] != listName[1]) {
    alert("Incorrect Answer");
  }
}

function ChangeTest(corrcetId, listName) {
  CheckTheMatch(corrcetId, listName);
}
</script>

<template>
  <h1>Angol Beginner</h1>
  <ProgressBar :value="progress"></ProgressBar>
  <p>3. fejezet</p>

  <div>
    <div class="flex flex-row" v-if="progress != 100">
      <div class="basis-1/3 mb-4">
        <draggable v-model="hungaryanTexts" tag="ul" group="meals">
          <template #item="{ element: text }">
            <li class="pointer">{{ text }}</li>
          </template>
        </draggable>
      </div>
      <div class="basis-1/3"></div>
      <div class="basis-1/3">
        <div id="list1-div" v-if="!correctAnswers.includes('question1')" :onchange="ChangeTest('question1', question1)">
          <draggable v-model="question1" tag="ul" group="meals" id="question1">
            <template #item="{ element: meal }">
              <li>{{ meal }}</li>
            </template>
          </draggable>
          <hr/>
        </div>
        <div id="list2-div" v-if="!correctAnswers.includes('question2')" :onchange="ChangeTest('question2', question2)">
          <draggable v-model="question2" tag="ul" group="meals" id="question2">
            <template #item="{ element: meal }">
              <li>{{ meal }}</li>
            </template>
          </draggable>
          <hr>
        </div>
        <div id="list3-div" v-if="!correctAnswers.includes('question3')" :onchange="ChangeTest('question3', question3)">
          <draggable v-model="question3" tag="ul" group="meals" id="question3">
            <template #item="{ element: meal }">
              <li>{{ meal }}</li>
            </template>
          </draggable>
          <hr/>
        </div>
        <div id="list4-div" v-if="!correctAnswers.includes('question4')" :onchange="ChangeTest('question4', question4)">
          <draggable v-model="question4" tag="ul" group="meals" id="question4">
            <template #item="{ element: meal }">
              <li>{{ meal }}</li>
            </template>
          </draggable>
          <hr/>
        </div>
        <div id="list5-div" v-if="!correctAnswers.includes('question5')" :onchange="ChangeTest('question5', question5)">
          <draggable v-model="question5" tag="ul" group="meals" id="question5">
            <template #item="{ element: meal }">
              <li>{{ meal }}</li>
            </template>
          </draggable>
        </div> 
      </div>
    </div>
      <div>
        <h1 v-if="progress == 100">Siker!</h1>
      </div>
  </div>
</template>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
