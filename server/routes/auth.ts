import { Request, Response, Router } from "express";
import { registerUser, testIfUserExists } from "../services/authService";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { LoginData, UserFormData } from "../../shared/types";
import { UserTokenData } from "../types/global";
import validator, { SchemasEnum } from "../middlewares/validator";
import login from "../middlewares/login";
export const usersRouter = Router();

usersRouter.post(
  "/register",
  validator(SchemasEnum.register),
  async (req: Request<{}, {}, UserFormData>, res: Response) => {
    const { email, password, name } = req.body;
    try {
      const isUserExist = await testIfUserExists(email);
      if (isUserExist) {
        throw "user already exists";
      }
      const hashedPassword = await hash(password, 10);
      await registerUser(email, hashedPassword, name);
      const authTokenData: UserTokenData = {
        email: email,
        name: name,
      };
      const newJwt = sign(authTokenData, process.env.JWT_SECRET as string);
      res.cookie("jwt", newJwt, {
        maxAge: 360000,
        secure: false,
      });
      res.status(201).json({ message: "user Successfully registered" });
    } catch (err) {
      res.status(500).json({ error: { message: err } });
    }
  }
);
usersRouter.post(
  "/login",
  validator(SchemasEnum.login),
  login,
  async (req: Request<{}, {}, LoginData>, res) => {
    const user = req.fullUser;
    const authTokenData: UserTokenData = {
      email: user.email,
      name: user.name,
    };
    const newJwt = sign(authTokenData, process.env.JWT_SECRET as string);
    res.cookie("jwt", newJwt, {
      maxAge: 360000,
      secure: false,
    });
    res.status(200).end("Login Successfully!");
  }
);
