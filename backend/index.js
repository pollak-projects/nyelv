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

const app = express();
const port = 3300;

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

app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`);
});

export default app;
