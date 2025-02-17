import { reactive } from "vue";
import { GetUserProgress } from "./script.js";

export const username_store = reactive({
  username: "admin",
});

export const user_current_progress_store = reactive({
  user_current_progress : await GetUserProgress()
});


