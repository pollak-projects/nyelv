<script setup>
import InputText from 'primevue/inputtext';
import { Button } from "primevue";
import ProgressBar from 'primevue/progressbar';
import { onMounted, ref } from 'vue';
import { GetTaskThree } from '../config/script';
import draggable from 'vuedraggable';


const isAnswerCorrect = ref(0);
const hungaryanTexts = ref([
  
]);
const currentTaskId = ref("beginner");
const divId = document.getElementById("list2");
const currentTaskNumber = ref(1);
const selectPairHU = ref(0);
const selectPairEN = ref(-1);
const re = ref();
let NumberOfCorrectAnswers = ref(0);
let progress = ref(0);
let task1 = "beginner";

onMounted( async () => {
  re.value = await GetTaskThree("beginner");
  for (let i = 0; i < re.value.length; i++) {
    hungaryanTexts.value.push(re.value[i].text);
  }
});


const yuckyMeals = ref([
  'Bat wing soup',
  'Spicy Octopus',
],
);

const yuckyMeals2 = ref([
  'apple',
],
);

const yuckyMeals3 = ref([
  'mom',
]);


function CheckTheMatch(corrcetId) {
  if(yuckyMeals2.value[0] ==yuckyMeals2.value[1]){
    alert("Correct Answer");
    document.getElementById(corrcetId).remove();
  }else if (yuckyMeals2.value.length == 2 && yuckyMeals2.value[0] != yuckyMeals2.value[1]) {
    alert("Incorrect Answer");
    if (yuckyMeals3.value[0] == yuckyMeals2.value[1]) {
      document.getElementById('list2').remove();
      document.getElementById('list3').remove(); 
    }
  }
}

function ChangeTest() {
  CheckTheMatch("list2");
}


</script>

<template>
 <h1>Angol Beginner</h1>
<ProgressBar :value="progress"></ProgressBar>
<p>3. fejezet</p>

<div>
      <div class="flex flex-row">
        <div class="basis-1/3 mb-4 ">
        <draggable v-model="hungaryanTexts" tag="ul" group="meals">
    <template #item="{ element: meal }">
      <li>{{ meal }}</li>
    </template>
</draggable>
    </div>
        <div class="basis-1/3">
        </div>
        <div class="basis-1/3">
          <div :onchange="ChangeTest()">
            <draggable v-model="yuckyMeals2" tag="ul" group="meals"  id="list2">
              <template #item="{ element: meal }"> 
                <li>{{ meal }}</li>
              </template>
          </draggable>
          </div>
          <hr>
          <draggable v-model="yuckyMeals3" tag="ul" group="meals"  id="list3">
              <template #item="{ element: meal }">
                <li>{{ meal }}</li>
              </template>
          </draggable>
</div>
    </div>
</div>



</template>

<style scoped> </style>