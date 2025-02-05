import express from "express";
import {
  listAllQuizzes,
  listAllQuizzesPair,
  listAllQuizPair,
  imageSaveToDB,
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

router.get("/getAngolPair", async (req, res) => {
  const { kapottSzo } = req.query;
  const data = await listAllQuizPair(kapottSzo);
  res.status(200).json(data);
});

router.post("/postImages", async (req, res) => {
  const { file } = req.body;
  console.log(file);
  const data = await imageSaveToDB(file);
  res.status(200).json(data);
});
export { router };