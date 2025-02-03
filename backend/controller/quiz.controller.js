import express from "express";
import { listAllQuizzes } from "../service/quiz.service.js";

const router = express.Router();


router.get("/getAllTask", async (req, res) => {
    const { kapottTipus } = req.query;
    const data = await listAllQuizzes(kapottTipus);
    res.status(200).json(data);
})

export { router };