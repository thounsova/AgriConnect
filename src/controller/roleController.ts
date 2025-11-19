import { Request, Response } from "express";
import { addRoleToSelfService } from "@/service/roleService";

// Controller to add role to logged-in user
export const addRoleController = async (req: Request, res: Response) => {
  return await addRoleToSelfService(req, res);
};
