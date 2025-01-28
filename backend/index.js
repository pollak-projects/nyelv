import express from "express";
import cookieParser from "cookie-parser";
import { router as userRouter } from "./controller/user.controller.js";
import { router as authRouter } from "./controller/auth.controller.js";
import cors from "cors";

const app = express();
const port = 3300;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.set("view engine", "ejs");
app.use("/user", userRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`);
});
