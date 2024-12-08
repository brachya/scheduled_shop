import { Request, Response, Router } from "express";
import { readFile } from "fs";
import { isUserExist, registerUser } from "../services/authService";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { LoginData, UserFormData } from "../../shared/types";
import { UserTokenData } from "../types/global";
export const usersRouter = Router();

usersRouter.post(
  "/register",
  async (req: Request<{}, {}, UserFormData>, res: Response) => {
    const { email, password, name } = req.body;
    console.log(email, password, name);
    if (isUserExist(email)) {
      res.status(400).json({ error: { message: "UserExist" } });
      return;
    }
    const hashedPassword = await hash(password, 10);

    const newUser = registerUser(email, hashedPassword, name);
    if (newUser) {
      res.status(200).json(newUser);
    } else {
      res.status(500).json({ error: { message: "server error" } });
    }
  }
);
usersRouter.post("/login", async (req: Request<{}, {}, LoginData>, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401).json({ message: "missing fields" });
    return;
  }
  const user = isUserExist(email);
  if (!user) {
    res.status(400).end("Email not exist");
    return;
  }
  const isValidPassword = await compare(password, user.password);
  if (!isValidPassword) {
    res.status(400).end("password not match");
    return;
  }
  const authTokenData: UserTokenData = {
    email: user.email,
    uid: user.uid,
  };
  const newJwt = sign(authTokenData, process.env.JWT_SECRET as string);
  res.cookie("jwt", newJwt, {
    maxAge: 360000,
    secure: false,
  });
  res.status(200).end("Login Successfully!");
});

usersRouter.get("/", (_req, res) => {
  return readFile("./users.json", (err, data) => {
    if (!err) {
      console.log(JSON.parse(data.toString()).users);
      res.status(200).json(JSON.parse(data.toString()).users);
    } else {
      console.log(err);
    }
  });
});
