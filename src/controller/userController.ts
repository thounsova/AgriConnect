import { Request, Response } from "express";
import { getUserService, deleteUserService, updateUserService, getUserByIdService, getMeService } from "@/service/userService";

// Get Users Controller
export const getUsersController = async (req: Request, res: Response) => {
    const getUserResult = await getUserService(req, res);
    return getUserResult;
};

// Delete User Controller
export const deleteUserController = async (req: Request, res: Response) => {
  const deleteUserResult = await deleteUserService(req, res);
  return deleteUserResult;
}

// Update User Controller
export const updateUserController = async (req: Request, res: Response) => {
  const updateUserResult = await updateUserService(req, res);
  return updateUserResult;
};
// User by Id
export const getUserByIdController = (req: Request, res: Response) => {
  return getUserByIdService(req, res);
};

// Get Me Controller
export const getMeController = async (req: Request, res: Response) => {
  const getMeResult = await getMeService(req, res);
  return getMeResult;
};