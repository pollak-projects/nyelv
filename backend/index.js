import express from "express";
import cookieParser from "cookie-parser";
import { router as userRouter } from "./controller/user.controller.js";
import { router as authRouter } from "./controller/auth.controller.js";
import { router as quizRouter } from "./controller/quiz.controller.js";
import cors from "cors";
import swaggerSpec from "./swagger.js";
import swaggerUi from "swagger-ui-express";
import disableMethodsForNonAdmin from "./middleware/auth.middleware.js";

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


app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.set("view engine", "ejs");
app.use("/user", disableMethodsForNonAdmin, userRouter);
app.use("/auth", authRouter);
app.use("/quiz", quizRouter);

app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`);
});
