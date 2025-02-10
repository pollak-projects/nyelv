<script setup>
import {Toolbar, Button, Avatar, Card} from 'primevue';
import { RouterLink } from 'vue-router';
import { GetUserProgress, Logout } from '../config/script.js';
import ProgressBar from "primevue/progressbar";
import { onMounted, ref } from "vue";
import { getCookie, parseJwt } from "../lib/common.js";
import { user_current_progress_store } from "../config/store.js";



const Logout2 = () => {
    Logout();
}


const user = ref(null);


onMounted(async () => {
  const userObj = parseJwt(getCookie("access_token"));
  user.value = userObj;
});


</script>




<template>
    <div class="card">
        <Toolbar style="border-radius: 3rem; padding: 1rem 1rem 1rem 1.5rem">
            <template #start>
                <div class="flex items-center gap-2">
                    <RouterLink to="/main"><Button label="Home" text plain /></RouterLink>
                    <Button label="Chat" text plain />
                    <RouterLink to="/tanfolyam"><Button label="Tanfolyamok" text plain /></RouterLink>
                </div>
            </template>

            <template #end>
                <div class="flex items-center gap-2">
                    <Button @click="Logout2" label="Kilépés" text plain />
                    <RouterLink to="/profile"><Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" style="width: 32px; height: 32px" /></RouterLink>           
                </div>
            </template>
        </Toolbar>
    </div>

<h1 class="nev" >Üdv {{ user?.username  }}!</h1>
    




<div class=" pr-5 pl-5 flex flex-row-reverse">
    <Card style="width: 25rem; overflow: hidden" class="mt-10">
        <template #header>
   
             <img alt="user header" src="../assets/napiszobackground.png" />
        </template>
        
        <template #title>Discombobulate </template>
        <template #subtitle>Szétzilál</template>
        
      
    </Card>
</div>

<div class=" pr-5 pl-5 flex flex-row-reverse" >
    <Card style="width: 25rem; overflow: hidden" class="mt-10">
        <template #header>
   
            
        </template>
        
        <template #title>A jelenlegi haladásod:</template>
        <template #subtitle>Remek munka!</template>
        <template #content>
        <div class="m-0">
          <div class="container">
            <div class="mt-2 mb-10">
              <h4>Beginner</h4>
              <ProgressBar :value="user_current_progress_store.user_current_progress"></ProgressBar>
            </div>
            <hr />
            <div class="mt-2 disabled mb-10">
              <h4>Intermediate</h4>
              <ProgressBar :value="0"></ProgressBar>
            </div>
            <hr />
            <div class="mt-2 mb-10 disabled">
              <h4>Polyglot master</h4>
              <ProgressBar :value="0"></ProgressBar>
            </div>
          </div>
        </div>
      </template>
      
    </Card>
</div>

 <footer class="custom-footer">
    <div class="footer-content">
      <div class="footer-links">
        
      </div>
      <div class="footer-info">
       
      </div>
      <div class="footer-social">
        <a href="https://facebook.com" target="_blank" rel="noopener">Facebook</a>
        <a href="https://twitter.com" target="_blank" rel="noopener">Twitter</a>
        <a href="https://instagram.com" target="_blank" rel="noopener">Instagram</a>
      </div>
    </div>
  </footer>
</template>



<style scoped>
/* Footer stílusok */
.custom-footer {
  background-color: #333;
  color: #fff;
  padding: 2rem 1rem;
  margin-top: 2rem;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.footer-links,
.footer-social {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.footer-links a,
.footer-social a {
  color: #fff;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.footer-links a:hover,
.footer-social a:hover {
  color: #b3b3b3;
}

.footer-info p {
  margin: 0.2rem 0;
  font-size: 0.8rem;
}

/* Mobilnézetre optimalizálás */
@media (max-width: 600px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
  
  .footer-links,
  .footer-social {
    justify-content: center;
    margin-bottom: 1rem;
  }
}

</style>