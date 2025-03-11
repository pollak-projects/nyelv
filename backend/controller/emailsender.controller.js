import express from "express";
import { Kuldes } from "../service/emailsender.js";

const router = express.Router();

router.post("/forgotpasswordmail", async (req, res) => {
  const { useremail } = req.body;

  try {
    await Kuldes(useremail);
    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Email send failed" });
  }
});

export { router };
