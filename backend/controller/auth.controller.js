import express from "express";
import { login, register } from "../service/auth.service.js";

const router = express.Router();

router.post("/getApiKey", async (req, res) => {
  const { user_id } = req.body;
  const apiKey = await genAPIKey(user_id);

  res.status(200).json({
    message: "Success",
    key: apiKey,
  });
});

router.post("/register", async (req, res) => {
  const { username, first_name, last_name, birth_date, email, password } =
    req.body;
  try {
    const user = await register(
      username,
      first_name,
      last_name,
      birth_date,
      email,
      password
    );
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await login(username, password);

    res.cookie("access_token", user.access_token, { maxAge: 10 * 60 * 1000 });
    res.cookie("refresh_token", user.refresh_token, { maxAge: 90 * 60 * 1000 });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("access_token", {
    path: "/",
  });
  res.clearCookie("refresh_token", {
    path: "/",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

export { router };
