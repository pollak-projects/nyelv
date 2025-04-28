import express from "express";
import {
  listAllQuizzes,
  listAllQuizzesPair,
  imageSaveToDB,
  imageGetFromDB,
  listAllQuizzesListening,
  GetDailyWords,
  AddWordToDB,
  GetLastDailyWord
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


async function Compilt() {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "You are a knowledgeable English teacher assistant who provides interesting and unique English words along with their Hungarian definitions." },
      { role: "user", content: "Give me an uncommon English word you can choose any word in the enlgish dictionary. Provide only the Hungarian definition, in the format: word:definition (without a space after the colon). The definition should be at least 15 words long and explain the meaning in depth." },
],
  });
  
  return response.choices[0].message.content;
}



router.get("/getDailyWord", async (req, res) => {
  const lastDate = await GetLastDailyWord();
  const currentDate = new Date().toISOString().split("T")[0];
if (lastDate.date.toISOString().split("T")[0] !== currentDate) {
  try {
    const data = await Compilt();
    const splited = data.split(":");
    console.log(splited[0]);
    let word = splited[0]+": "+splited[1];
    await AddWordToDB(word);
    res.status(200).json(splited);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch chat response" });
  }
}else{
  const data = lastDate.word.split(":");
  res.status(200).json(data);
}
});
