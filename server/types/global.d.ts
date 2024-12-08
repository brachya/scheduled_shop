declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    JWT_SECRET?: string;
  }
}
export interface UserTokenData {
  email: string;
  uid: string;
}
