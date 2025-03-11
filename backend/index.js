import express from "express";
import cookieParser from "cookie-parser";
import { router as userRouter } from "./controller/user.controller.js";
import { router as authRouter } from "./controller/auth.controller.js";
import { router as quizRouter } from "./controller/quiz.controller.js";
import { router as selfRouter } from "./controller/self.controller.js";
import cors from "cors";
import swaggerSpec from "./swagger.js";
import swaggerUi from "swagger-ui-express";
import { disableMethodsForNonAdmin } from "./middleware/auth.middleware.js";
import { listAllUsers } from "./service/user.service.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { PrismaClient } from "@prisma/client";
import OpenAI from "openai";

const prisma = new PrismaClient();
const app = express();
const server = createServer(app);
const port = 3300;

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://pollak.info",
      /https:\/\/[a-z0-9]+\.pollak\.info/,
    ],
    credentials: true,
  },
});

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://pollak.info",
    /https:\/\/[a-z0-9]+\.pollak\.info/,
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.set("view engine", "ejs");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use("/user", disableMethodsForNonAdmin, userRouter);
app.use("/auth", authRouter);
app.use("/quiz", quizRouter);
app.use("/self", selfRouter);

app.get("/admintable", disableMethodsForNonAdmin, async (req, res) => {
  const data = await listAllUsers();
  console.log(data);
  res.render("index", {
    felhasznalok: data,
  });
});

app.get("/", async (req, res) => {
  res.render("login");
});

app.get("/chat", async (req, res) => {
  res.render("chat");
});

async function SendToDB(msg, flag) {
  await prisma.chatMessages.create({
    data: {
      message: msg,
      flag: flag,
    },
  });
}

async function Moderation(msg){
  const openai = new OpenAI({
    apiKey:
      "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",
  });
  let flagged = 0;

  const moderation = await openai.moderations.create({
    model: "omni-moderation-latest",
    input: msg,
  });

  for (const key in moderation.results[0].categories){
    if (Object.prototype.hasOwnProperty.call(moderation.results[0].categories, key)) {
      const element = moderation.results[0].categories[key];
      if (element == true) {
        flagged = 1
      }
    }
  }
  console.log(flagged)
  return flagged
  
}


io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("chat message", async (msg) => {
    let flag = await Moderation(msg.text)
    
    if (flag == 0) {

       io.emit("chat message", {
        text: msg.text,
        userId: msg.userId,
       }); 
    }
    SendToDB(msg, flag)
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`App started at http://localhost:${port}`);
});

export default app;
