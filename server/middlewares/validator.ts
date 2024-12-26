import { ValidationError, ObjectSchema } from "joi";
import registerSchema from "../schemas/register";
import { NextFunction, Request, Response } from "express";
import { loginSchema } from "../schemas/login";
export enum SchemasEnum {
  register = 1,
  login,
}
const schemaDictionary: Record<SchemasEnum, ObjectSchema> = {
  [SchemasEnum.register]: registerSchema,
  [SchemasEnum.login]: loginSchema,
};
export default (validator: SchemasEnum) => {
  const schema = schemaDictionary[validator];
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const validate = schema.validate(body);
      if (validate.error) {
        throw validate.error;
      }
      next();
    } catch (error) {
      res.status(400).json((error as ValidationError).details);
    }
  };
};
