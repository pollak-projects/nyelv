import { createRouter, createWebHistory } from "vue-router";
import { getCookie, parseJwt } from "../lib/common";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Login",
      component: () => import("../components/Login.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../components/Register.vue"),
    },
    {
      path: "/main",
      name: "Main",
      component: () => import("../components/Main.vue"),
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import("../components/Profile.vue"),
    },
    {
      path: "/tanfolyam",
      name: "Tanfolyam",
      component: () => import("../components/Tanfolyam.vue"),
    },
    {
      path: "/taskone",
      name: "TaskOne",
      component: () => import("../components/TaskOne.vue"),
    },
    {
      path: "/tasktwo",
      name: "TaskTwo",
      component: () => import("../components/TaskTwo.vue"),
    },
    {
      path: "/taskthree",
      name: "TaskThree",
      component: () => import("../components/TaskThree.vue"),
    },
    {
      path: "/taskfour",
      name: "TaskFour",
      component: () => import("../components/TaskFour.vue"),
    },
    {
      path: "/picture",
      name: "Picture",
      component: () => import("../components/PicturesUpload.vue"),
    },
    {
      path: "/chat",
      name: "Chat",
      component: () => import("../components/Chat.vue"),
    },
    {
      path: "/forgotpassword",
      name: "ForgotPassword",
      component: () => import("../components/Forgotpassword.vue"),
    },
    {
      path: "/newpassword",
      name: "NewPassword",
      component: () => import("../components/Newpassword.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const accessToken = getCookie("access_token");
  const parsedToken = parseJwt(accessToken);

  if (
    to.name === "Login" &&
    to.name === "Register" &&
    to.name === "ForgotPassword" &&
    accessToken &&
    parsedToken &&
    parsedToken.userGroup === "ADMIN"
  ) {
    next({ name: "Kezdés" });
  } else if (
    (!accessToken &&
      to.name !== "Login" &&
      to.name !== "Register" &&
      to.name !== "ForgotPassword") ||
    (to.name === "Register" && accessToken)
  ) {
    next({ name: "Login" });
  } else {
    next();
  }
});
export { router };
