import express from "express";
import { listAllQuizzes } from "../service/quiz.service.js";

const router = express.Router();


router.get("/getAllTask", async (req, res) => {
    const { kerdesSzama } = req.query;
    const data = await listAllQuizzes(kerdesSzama);
    res.status(200).json(data);
})

export { router };