import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { usersRouter } from "./routes/auth";
import cookieParser from "cookie-parser";
import authenticateToken from "./middlewares/verify";
import cors from "cors";
import "./types/custom";
dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 5000;
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
  })
);
app.use("/auth", usersRouter);
app.get("/protected", authenticateToken, (req: Request, res: Response) => {
  if (req.user) {
    console.log(`user connected: ${req.user.email}`);
    res.status(200).end("SUCCESS");
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.get("/", (req, res) => {
  res.status(200).end("Welcome to our server!");
});
app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
