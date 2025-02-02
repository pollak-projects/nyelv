<script setup>
import {Toolbar, Button, Avatar} from 'primevue';
import { RouterLink } from 'vue-router';
import { Logout } from '../config/script.js';


</script>

<template>
    <div class="card">
        <Toolbar style="border-radius: 3rem; padding: 1rem 1rem 1rem 1.5rem">
            <template #start>
                <div class="flex items-center gap-2">
                    <RouterLink to="/main"><Button label="Home" text plain /></RouterLink>
                    <Button label="Chat" text plain />
                    <Button label="Tanfolyamok" text plain />
                </div>
            </template>

            <template #end>
                <div class="flex items-center gap-2">
                        <Button @click="Logout" label="Kilépés" text plain />
                        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" style="width: 32px; height: 32px" />           
                </div>
            </template>
        </Toolbar>
    </div>
</template>

<style scoped>
</style>