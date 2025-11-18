import { Request, Response } from "express";
import { getAllUserService  , getAllFarmersService} from "@/service/userService"; // import your service

// Controller for getting all users
export const getAllUserController = async (req: Request, res: Response) => {
  return getAllUserService(req, res);
};
//Controller for getting all farmers
export const getAllFarmersController = async (req: Request, res: Response) => {
  return getAllFarmersService(req, res);
};



