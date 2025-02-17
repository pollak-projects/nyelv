import express from "express";
import {
  listAllQuizzes,
  listAllQuizzesPair,
  imageSaveToDB,
  imageGetFromDB,
  listAllQuizzesListening
} from "../service/quiz.service.js";

const router = express.Router();


router.get("/getAllTask", async (req, res) => {
    const { kapottTipus } = req.query;
    const data = await listAllQuizzes(kapottTipus);
    res.status(200).json(data);
})

router.get("/getAllPair", async (req, res) => {
  const { kapottTipus } = req.query;
  const data = await listAllQuizzesPair(kapottTipus);
  res.status(200).json(data);
});

router.get("/getAllListening", async (req, res) => {
  const { kapottTipus } = req.query;
  const data = await listAllQuizzesListening(kapottTipus);
  console.log(data[0].audio);
  res.status(200).json(data);
});

router.post("/postImages", async (req, res) => {
  const { file } = req.body;
  console.log(file);
  const data = await imageSaveToDB(file);
  res.status(200).json(data);
});
export { router };

router.get("/getImages", async (req, res) => {
  const { kapottTipus } = req.query;
  const data = await imageGetFromDB(kapottTipus);
  res.status(200).json(data);
});
