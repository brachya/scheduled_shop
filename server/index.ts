import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { usersRouter } from "./routes/auth";
import cookieParser from "cookie-parser";
import authenticateToken from "./middlewares/verify";
import cors from "cors";
import "./types/custom";
import AWS from "aws-sdk";
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
AWS.config.update({
  region: "eu-north-1",
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
});
app.use("/auth", usersRouter);
app.get("/protected", authenticateToken, (req: Request, res: Response) => {
  if (req.user) {
    console.log(`user connected: ${req.user.email}`);
    res.status(200).end("SUCCESS");
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});
app.get("/users", (req: Request, res: Response) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: "Users",
  };
  try {
    dynamoDB.scan(params, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "server error" });
      } else {
        res.status(200).json(data.Items);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
});

app.get("/", (req, res) => {
  res.status(200).end("Welcome to our server!");
});
app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
