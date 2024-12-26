import { NextFunction, Request, Response } from "express";
import AWS from "aws-sdk";
import { User } from "../../shared/types";
import { compareSync } from "bcrypt";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  try {
    const { Item } = await dynamoDB
      .get({
        TableName: "Users",
        Key: { email },
      })
      .promise();
    const hashedPassword = Item?.password;
    const isValidPassword = compareSync(password, hashedPassword);
    if (!isValidPassword) {
      throw "invalid password";
    }
    req.fullUser = Item as User;
    next();
  } catch (err) {
    res.json(err);
  }
};
