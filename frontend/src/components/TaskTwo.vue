<script setup>
import InputText from 'primevue/inputtext';
import { Button } from "primevue";
import ProgressBar from 'primevue/progressbar';
import { onMounted, ref } from 'vue';
import { GetCurrentTaskPair } from '../config/script';


const isAnswerCorrect = ref(0);
const currentTaskId = ref("beginner");
const currentTaskNumber = ref(1);
const re = ref(null);
let correctAnswer = ref("");
let progress = ref(0);

onMounted(async () => {
re.value = await GetCurrentTaskPair(currentTaskId.value);
correctAnswer = re.value[currentTaskNumber.value-1].valasz;

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
            correctAnswer = re.value[currentTaskNumber.value-1].valasz;
        }, 2000);
    } else {
        isAnswerCorrect.value = 2;
        progress.value += 20;
        setTimeout(() => {
            givenAnswer = "";
            isAnswerCorrect.value = 0;
            currentTaskNumber.value++;
            correctAnswer = re.value[currentTaskNumber.value-1].valasz;
        }, 2000);
    }

}
</script>

<template>
<h1>Angol Beginner</h1>
<ProgressBar :value="progress"></ProgressBar>
<p>2. fejezet</p>

<div class="mx-auto text-center align-middle" v-for="task in re">
<h4 class="mb-5" >{{task.magyar_par}}</h4>
<h4 class="mb-5" >{{task.angol_par}}</h4>
</div>
<div v-if="currentTaskNumber > 5" class="mx-auto text-center align-middle">
<h1>Siker!</h1>
</div>


<div v-if="isAnswerCorrect == 1" class="fixed-bottom bg-emerald-400 h-40 w-full">
    <h1 class="mb-5">Correct Answer</h1>
    <p>Ide majd kiírjuk az összes mondatot.</p>
</div>
<div v-if="isAnswerCorrect == 2" class="fixed-bottom bg-red-600 h-40 w-full">
    <h1 class="mb-5">Incorrect Answer</h1>
    <p>Ide majd kiírjuk az összes mondatot.</p>
</div>

</template>

<style scoped>

</style>