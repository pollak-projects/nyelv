<script setup>
import { Toolbar, Button, Avatar, Card, Timeline, InputText} from "primevue";

import { RouterLink } from "vue-router";
import { onMounted, ref } from "vue";
import { getCookie, parseJwt } from "../lib/common.js";
import { Logout } from "../config/script.js";

const Logout2 = () => {
  Logout();
};

const user = ref(null);



onMounted(async () => {
  const userObj = parseJwt(getCookie("access_token"));
  user.value = userObj;
});
</script>

<template>
  <Toolbar
    style="border-radius: 3rem; padding: 1rem 1rem 1rem 1.5rem"
    class="mt-1 ml-1 mr-1"
  >
    <template #start>
      <div class="flex items-center gap-2">
        <RouterLink to="/main">
          <Button label="Home" text plain />
        </RouterLink>
        <RouterLink to="/chat"
          ><Button label="Chat" text plain /></RouterLink>
        <RouterLink to="/tanfolyam"
          ><Button label="Tanfolyamok" text plain
        /></RouterLink>
      </div>
    </template>

    <template #end>
      <div class="flex items-center gap-2">
        <Button @click="Logout2" label="Kilépés" text plain />
        <RouterLink to="/profile"
          ><Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            style="width: 32px; height: 32px"
        /></RouterLink>
      </div>
    </template>
  </Toolbar>
<div class="flex flex-row text-center ">
 
    <div class="basis-1/3 mb-4 mt-5">
  <div class="ml-150 font-bold">  {{ user?.username }} </div>
    <div class="border-2 border-solid rounded-xl bg-amber-100">
    safsafsafsaf
    </div>
 </div> <div class="basis-1/3 mb-4 mt-5 ">

    
 </div> <div class="basis-1/3 mb-4 mt-20">
  <div class="mr-150 font-bold">  {{ user?.username }} </div>
    <div class="border-2 border-solid rounded-xl bg-amber-100 ">
    eadfgdygdsg

    
</div>

</div>
 </div>


  <div class="absolute inset-x-0 bottom-0 h-16 flex ...">
  <InputText type="text" v-model="value" class="w-5/6 " />
<Button label="Küldés" class="w-1/6 "/>
</div>
</template>




  <script setup></script>