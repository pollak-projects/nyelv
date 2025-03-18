import express from "express";
import {
  listAllQuizzes,
  listAllQuizzesPair,
  imageSaveToDB,
  imageGetFromDB,
  listAllQuizzesListening
} from "../service/quiz.service.js";
import OpenAI from "openai/index.mjs";
// import { APIKEY } from "../apikey.js";


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
  apiKey:
    "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",
});
let usedWords = "";

async function Compilt() {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "You are a knowledgeable English teacher assistant who provides interesting and unique English words along with their Hungarian definitions." },
      { role: "user", content: "Give me an uncommon English word you can choose any word in the enlgish dictionary but non if this: "+ usedWords + ". Provide only the Hungarian definition, in the format: word:definition (without a space after the colon). The definition should be at least 15 words long and explain the meaning in depth." },
],
  });
  
  return response.choices[0].message.content;
}

router.get("/getDailyWord", async (req, res) => {
  try {
    const data = await Compilt();
    const splited = data.split(":");
    usedWords += splited[0] + ", ";
    console.log(usedWords);
    res.status(200).json(splited);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch chat response" });
  }
});
