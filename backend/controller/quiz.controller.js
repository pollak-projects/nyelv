import express from "express";
import {
  listAllQuizzes,
  listAllQuizzesPair,
  imageSaveToDB,
  imageGetFromDB,
  listAllQuizzesListening
} from "../service/quiz.service.js";
import OpenAI from "openai/index.mjs";
import { APIKEY } from "../apikey.js";

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
  //console.log(data[0].audio);
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


const openai = new OpenAI({
  apiKey: APIKEY,
});

async function Compilt() {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "You are a english teacher assistant." },
      { role: "user", content: "Tell me a interesting english word must be something other than Petrichor and just the hungarian definition of the word not the english. in this format: word:definition don't put a space after the : no yap" },
    ],
  });
  
  return response.choices[0].message.content;
}

router.get("/getDailyWord", async (req, res) => {
  try {
    const data = await Compilt();
    const splited = data.split(":");
    res.status(200).json(splited);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch chat response" });
  }
});
