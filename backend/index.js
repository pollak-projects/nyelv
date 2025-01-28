import express from "express";
import cookieParser from "cookie-parser";
import { router as userRouter } from "./controller/user.controller.js";
import { router as authRouter } from "./controller/auth.controller.js";
import cors from "cors";
import swaggerSpec from "./swagger.js"
import swaggerUi from "swagger-ui-express"


const app = express();
const port = 3300;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.set("view engine", "ejs");
app.use("/user", userRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`);
});
