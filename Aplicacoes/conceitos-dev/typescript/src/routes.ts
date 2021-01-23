import { Request, Response } from "express";
import createUser from "./services/CreateUser";

export function helloWorld(request: Request, response: Response) {
  const user = createUser({
    email: "daniel@gmail.com",
    password: "password123",
    techs: [
    "Node.js",
    "React.js", 
    "React Native", 
    { title: "Javascript", experience: 70}
  ],
  });

  return response.json(user);
}
