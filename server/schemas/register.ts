import Joi from "joi";
import { UserFormData } from "../../shared/types";

const registerSchema = Joi.object<UserFormData, true>({
  email: Joi.string().email().required().messages({
    "string.email": "My custom email message",
    "any.required": "email missing",
    "any.emailExist": "email Already exist",
  }),
  name: Joi.string().min(2).required(),
  password: Joi.string().min(6).required(),
});
export default registerSchema;
