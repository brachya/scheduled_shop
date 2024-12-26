import Joi from "joi";
import { LoginData } from "../../shared/types";

export const loginSchema = Joi.object<LoginData, true>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
