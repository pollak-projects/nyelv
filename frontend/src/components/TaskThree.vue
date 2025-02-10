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
const re = ref();
let progress = ref(0);

onMounted(async () => {
  re.value = await GetTaskThree(currentTaskId);
  for (let i = 0; i < re.value.length; i++) {
    hungaryanTexts.value.push(re.value[i].text);
  }
});

const correctAnswers = ref([]);

const yuckyMeals2 = ref(["apple"]);

const yuckyMeals3 = ref(["mom"]);

function CheckTheMatch(corrcetId, listName) {
  if (listName[0] == listName[1]) {
    alert("Correct Answer");
    console.log(corrcetId);
    document.getElementById(corrcetId).remove();
    correctAnswers.value.push(corrcetId);
    progress.value += 50;
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
          <template #item="{ element: meal }">
            <li>{{ meal }}</li>
          </template>
        </draggable>
      </div>
      <div class="basis-1/3"></div>
      <div class="basis-1/3">
        <div
          id="list2-div"
          v-if="!correctAnswers.includes('list2')"
          :onchange="ChangeTest('list2', yuckyMeals2)"
        >
          <draggable v-model="yuckyMeals2" tag="ul" group="meals" id="list2">
            <template #item="{ element: meal }">
              <li>{{ meal }}</li>
            </template>
          </draggable>
          <hr />
        </div>
        <div
          id="list3-div"
          v-if="!correctAnswers.includes('list3')"
          :onchange="ChangeTest('list3', yuckyMeals3)"
        >
          <draggable v-model="yuckyMeals3" tag="ul" group="meals" id="list3">
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

<style scoped></style>
