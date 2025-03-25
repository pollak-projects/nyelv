import express from "express";
import cookieParser from "cookie-parser";
import { router as userRouter } from "./controller/user.controller.js";
import { router as authRouter } from "./controller/auth.controller.js";
import { router as quizRouter } from "./controller/quiz.controller.js";
import { router as emailsenderRouter } from "./controller/emailsender.controller.js";
import { router as chatRouter } from "./controller/chatmessages.controller.js";
import { router as selfRouter } from "./controller/self.controller.js";
import cors from "cors";
import swaggerSpec from "./swagger.js";
import swaggerUi from "swagger-ui-express";
import { disableMethodsForNonAdmin } from "./middleware/auth.middleware.js";
import { listAllUsers } from "./service/user.service.js";
import { listAllMessages } from "./service/chatmessages.service.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { PrismaClient } from "@prisma/client";
import OpenAI from "openai";

const prisma = new PrismaClient();
const app = express();
const server = createServer(app);
const port = 3300;

const allowedOrigins = ["http://localhost:5173", "https://pollak.info"];

const corsOptions = {
  origin: (origin, callback) => {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      /^https:\/\/[a-z0-9]+\.pollak\.info$/.test(origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const io = new Server(server, {
  cors: corsOptions,
});

app.use("/user", disableMethodsForNonAdmin, userRouter);
app.use("/auth", authRouter);
app.use("/quiz", quizRouter);
app.use("/self", selfRouter);
app.use("/emailsender", emailsenderRouter);
app.use("/chat", chatRouter);

app.get("/admintable", disableMethodsForNonAdmin, async (req, res) => {
  const data = await listAllUsers();
  const chatdata = await listAllMessages();
  res.render("index", {
    felhasznalok: data,
    chat: chatdata,
  });
});

app.get("/", async (req, res) => {
  res.render("login");
});

app.get("/chat", async (req, res) => {
  res.render("chat");
});

async function SendToDB(msg, flag, id) {
  await prisma.chatMessages.create({
    data: {
      message: msg,
      flag: flag,
      user: { connect: { id: id } },
    },
  });
}

async function GetUsername(id) {
  const data = await prisma.user.findUnique({
    where: { id: id },
  });
  return data.username;
}

async function Moderation(msg) {
  const openai = new OpenAI({
    apiKey: "your-openai-api-key",
  });
  let flagged = 0;

  const moderation = await openai.moderations.create({
    model: "omni-moderation-latest",
    input: msg,
  });

  for (const key in moderation.results[0].categories) {
    if (moderation.results[0].categories[key]) {
      flagged = 1;
    }
  }
  return flagged;
}

const bannedWords = [
  "cum",
  "dick",
  "hitler",
  "asshole",
  "foreskin",
  "shit",
  "jerk",
];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("chat message", async (msg) => {
    let flag = await Moderation(msg.text);

    if (flag === 0) {
      let nemMehetKi = bannedWords.some((word) =>
        msg.text.toLowerCase().includes(word)
      );
      if (!nemMehetKi) {
        io.emit("chat message", {
          text: msg.text,
          userId: await GetUsername(msg.userId),
        });
      } else {
        flag = 1;
      }
    }
    SendToDB(msg.text, flag, msg.userId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`App started at http://localhost:${port}`);
});

export default app;
