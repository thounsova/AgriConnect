import { Request, Response } from "express";
import { getAllUserService  } from "@/service/userService"; // import your service

// Controller for getting all users
export const getAllUserController = async (req: Request, res: Response) => {
  return getAllUserService(req, res);
};



