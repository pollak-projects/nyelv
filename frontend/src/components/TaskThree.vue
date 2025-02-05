<script setup>
import InputText from 'primevue/inputtext';
import { Button } from "primevue";
import ProgressBar from 'primevue/progressbar';
import { onMounted, ref } from 'vue';
import { GetCurrentTaskPair } from '../config/script';
import draggable from 'vuedraggable';


const isAnswerCorrect = ref(0);
const isdraged = ref(0);
const currentTaskId = ref("beginner");
const currentTaskNumber = ref(1);
const selectPairHU = ref(0);
const selectPairEN = ref(-1);
const re = ref(null);
let NumberOfCorrectAnswers = ref(0);
let progress = ref(0);

onMounted( () => {

});
const meals = ref([
  "Spaghetti",
]);

const yuckyMeals = ref([
  'Bat wing soup',
  'Spicy Octopus',
  'Anything from Taco Bell',
]);


</script>

<template>
 <h1>Angol Beginner</h1>
<ProgressBar :value="progress"></ProgressBar>
<p>3. fejezet</p>

<div class="text-ceter">
      <div class="flex flex-row">
        <div class="basis-1/3 mb-4 "><draggable v-model="yuckyMeals" tag="ul" group="meals">
    <template #item="{ element: meal }">
      <li>{{ meal }}</li>
    </template>
</draggable></div>
        <div class="basis-1/3"></div>
        <div class="basis-1/3"><draggable v-model="meals" tag="ul" group="meals" class="bg-amber-950">
    <template #item="{ element: meal }">
      <li>{{ meal }}</li>
    </template>
</draggable>
</div>
    </div>
</div>



</template>

<style scoped> </style>