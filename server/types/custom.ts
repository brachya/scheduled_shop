import { UserTokenData } from "./global";
import { User } from "../../shared/types";
declare global {
  namespace Express {
    export interface Request {
      user: UserTokenData;
      fullUser: User;
    }
  }
}
