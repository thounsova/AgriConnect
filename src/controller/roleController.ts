import { Request, Response } from "express";
import { addRoleService, removeRoleService,  } from "@/service/roleService";

// Controller to add a role to a user
export const addRoleController = async (req: Request, res: Response) => {
  await addRoleService(req, res);
};

// Controller to remove a role from a user
export const removeRoleController = async (req: Request, res: Response) => {
  await removeRoleService(req, res);
};


