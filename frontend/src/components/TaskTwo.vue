<script setup>
import InputText from 'primevue/inputtext';
import { Button } from "primevue";
import ProgressBar from 'primevue/progressbar';
import { onMounted, ref } from 'vue';
import { GetCurrentTaskPair } from '../config/script';


const isAnswerCorrect = ref(0);
const currentTaskId = ref("beginner");
const currentTaskNumber = ref(1);
const selectPairHU = ref(0);
const selectPairEN = ref(-1);
const re = ref(null);
let NumberOfCorrectAnswers = ref(0);
let progress = ref(0);

onMounted(async () => {
re.value = await GetCurrentTaskPair(currentTaskId.value);

});

function SelectPairHU(buttonId){
    selectPairHU.value = document.getElementById("taskhu-"+buttonId).value;
    console.log(selectPairHU.value);
}
function SelectPairEN(buttonId) {
    selectPairEN.value = document.getElementById("tasken-"+buttonId).value;
    let elementHU = document.querySelector("button[value='"+selectPairHU.value+"']");
    let elementEN = document.querySelector("button[value='"+selectPairEN.value+"']");
    if ((selectPairHU.value).slice(3) == (selectPairEN.value).slice(3)) {
        console.log("Correct Answer");
            elementHU.remove();
            elementEN.remove();
            NumberOfCorrectAnswers.value++;
            progress.value += 20;
            isAnswerCorrect.value = 1;
            setTimeout(() => {
                isAnswerCorrect.value = 0;
            }, 1000);
    } else {
        console.log("Incorrect Answer");
        selectPairHU.value = 0;
        isAnswerCorrect.value = 2;
        setTimeout(() => {
            isAnswerCorrect.value = 0;
        }, 1000);
    }
}



</script>

<template>
<h1>Angol Beginner</h1>
<ProgressBar :value="progress"></ProgressBar>
<p>2. fejezet</p>

<div class="text-center" v-for="task in re">
    <div class="flex flex-row">
        <div class="basis-1/3 mb-4"><Button :value="'HU-'+task.id" :label="task.magyar_par" :id="'taskhu-' + task.magyar_par" severity="info" class="w-40" @click="SelectPairHU(task.magyar_par)"/></div>
        <div class="basis-1/3"></div>
        <div class="basis-1/3"><Button :value="'EN-'+task.id" :label="task.angol_par" severity="info" class="w-40" :id="'tasken-' + task.angol_par" @click="SelectPairEN(task.angol_par)"/></div>
    </div>
</div>
<div v-if="NumberOfCorrectAnswers >= 5" class="mx-auto text-center align-middle">
<h1>Siker!</h1>
</div>


<div v-if="isAnswerCorrect == 1" class="fixed-bottom bg-emerald-400 h-40 w-full">
    <h1 class="mb-5">Correct Answer</h1>
    <p></p>
</div>
<div v-if="isAnswerCorrect == 2" class="fixed-bottom bg-red-600 h-40 w-full">
    <h1 class="mb-5">Incorrect Answer</h1>
    <p></p>
</div>

</template>

<style scoped>

</style>