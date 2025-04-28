import express from "express";
import { GetLastUsedWord, GetRandomWordGame } from "../service/wordgame.service.js";


const router = express.Router();

router.get("/randomword", async (req, res) => {
  const word = await GetRandomWordGame();
  res.status(200).json(word);
})

router.get("/lastused",async (req,res) =>{
    const word = await GetLastUsedWord();
    res.status(200).json(word);
})


export { router };