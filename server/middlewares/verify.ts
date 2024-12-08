import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserTokenData } from "../types/global";

const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies.jwt;
  if (!token) {
    res.status(401).end("Missing authenticateToken");
  }

  try {
    const user = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as UserTokenData;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).end("Missing Invalid Credentials");
  }
};
export default authenticateToken;
