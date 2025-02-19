import express from "express";
import { getUserProgress } from "../service/self.service.js";

const router = express.Router();

router.get("/getCurrentProgress", async (req, res) => {
  const username = req.query.username;
  const data = await getUserProgress(username);
  res.status(200).json(data);
});

export { router };
