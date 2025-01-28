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
        }
    ]
});

export { router };