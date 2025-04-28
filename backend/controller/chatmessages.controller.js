import express from "express";
import { listAllMessages, updateChat } from "../service/chatmessages.service.js";

const router = express.Router();


router.get("/getAllMessages", async (_req, res) => {
  const data = await listAllMessages();
  res.status(200).json(data);
});

router.put("/updateChat", async (req, res) => {;
    const id = req.query.id;
    console.log(id)
    const { flag } = req.body;
    const data = await updateChat(id, flag);
    res.status(200).json(data);
});

export { router };