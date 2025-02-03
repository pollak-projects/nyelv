<script setup>
import InputText from 'primevue/inputtext';
import { Button } from "primevue";
import ProgressBar from 'primevue/progressbar';
import { onMounted, ref } from 'vue';
import { GetCurrentTask } from '../config/script';


const isAnswerCorrect = ref(false);
const currentTaskNumber = ref(1);
const re = ref(null);
let correctAnswer = ref("");
let progress = ref(0);

onMounted(async () => {
re.value = await GetCurrentTask(currentTaskNumber.value);
correctAnswer = re.value[0].valasz;

});
function SubmitAnswer() {
    let givenAnswer = document.getElementById("answereBox").value;

    if (givenAnswer == correctAnswer) {
        isAnswerCorrect.value = true;
        alert("Correct Answer");
        progress.value += 20;
    } else {
        alert("Wrong Answer");
    }

}
</script>

<template>
<h1>Angol Beginner</h1>
<ProgressBar :value="progress"></ProgressBar>
<p>1. fejezet 1. feladat</p>

<div class="mx-auto text-center align-middle" v-for="task in re">
<h4 class="mb-5">{{task.kerdes}}</h4>
<InputText placeholder="Write your answer here..." id="answereBox" type="text" v-model="value" variant="filled" />
<Button @click="SubmitAnswer" label="Submit" severity="success" />
</div>


<!--
<div v-if="isAnswerCorrect" class="fixed-bottom bg-emerald-400 h-40 w-full">
    <h1 class="mb-5">Correct Answer</h1>
    <p>Ide majd kiírjuk az összes mondatot.</p>
</div>
-->
</template>

<style scoped>

</style>