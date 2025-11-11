import { Request, Response } from "express";
import { addFarmerservice } from "@/service/userService";

export const addFarmerController = async (req: Request, res: Response) => {
  return await addFarmerservice(req, res);
}

