import { UserTokenData } from "./global";

declare global {
  namespace Express {
    export interface Request {
      user?: UserTokenData;
    }
  }
}
