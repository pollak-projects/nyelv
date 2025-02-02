import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Login",
      component: import("../components/Login.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: import("../components/Register.vue"),
    },
    {
      path: "/main",
      name: "Main",
      component: import("../components/Main.vue"),
    },
    {
      path: "/profile",
      name: "Profile",
      component: import("../components/Profile.vue"),
    },
    {
      path: "/tanfolyam",
      name: "Tanfolyam",
      component: import("../components/Tanfolyam.vue"),
    },
    {
      path: "/taskone",
      name: "TaskOne",
      component: import("../components/TaskOne.vue"),
    }
  ],
});

export { router };