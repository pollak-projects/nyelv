<script setup>
import { ref } from "vue";
import { FileUpload } from "../config/script.js";

const rawImg = ref();
const imgs = ref();
const reader = new FileReader();

function Save() {
    reader.onload = async function (e) {
        rawImg.value = reader.result;
        console.log(rawImg.value);
        await FileUpload(rawImg.value);
    };
    const fileInput = imgs.value
    if (fileInput && fileInput.files[0]) {
        reader.readAsDataURL(fileInput.files[0]);
    }
}
</script>

<template>
<input type="file" ref="imgs" />
<button @click="Save">Save</button>
</template>

<style scoped></style>