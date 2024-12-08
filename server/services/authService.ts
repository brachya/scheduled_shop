import { readFileSync, writeFileSync } from "fs";
import { v4 } from "uuid";
import User from "../types/users";

const getUsersAsObject = () => {
  const file = JSON.parse(readFileSync("./mock-db.json").toString());
  return file;
};

export const isUserExist = (email: string): User => {
  return getUsersAsObject().users.find((user: User) => user.email == email);
};
export const registerUser = (
  email: string,
  hashedPassword: string,
  name: string
): Partial<User> | null => {
  try {
    const uid = v4();
    const file = getUsersAsObject();
    const newUser = { name, email, password: hashedPassword, uid };
    file.users.push(newUser);
    writeFileSync("./mock-db.json", JSON.stringify(file));
    const { password, ...rest } = newUser;
    return rest;
  } catch (err) {
    if (err) {
      console.log(err);
    }
    return null;
  }
};
