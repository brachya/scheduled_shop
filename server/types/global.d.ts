declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    JWT_SECRET?: string;
    accessKeyId: string;
    secretAccessKey: string;
  }
}
export interface UserTokenData {
  email: string;
  name: string;
}
