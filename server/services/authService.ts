import User from "../types/users";
import AWS from "aws-sdk";
export const testIfUserExists = async (email: string) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { Item } = await dynamoDB
    .get({
      TableName: "Users",
      Key: { email },
    })
    .promise();
  return Item as User;
};
export const registerUser = async (
  email: string,
  hashedPassword: string,
  name: string
) => {
  try {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const newUser = { name, email, password: hashedPassword };
    const params = {
      TableName: "Users",
      Item: {
        ...newUser,
        createdAt: new Date().toString(),
      },
    };
    await dynamoDB.put(params).promise();
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
};
