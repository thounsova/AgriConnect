import { clearAuthCookies } from './../utils/cookie';
import { Request, Response } from "express";
import { handleError } from "@/utils/response-util";
import { addFarmerService , loginService , logoutService} from "@/service/authService";

export const addFarmerController = async (req: Request, res: Response) => {
  return await addFarmerService(req, res);
}

// Controller to handle user login
export const loginController = async (req: Request, res: Response) => {
  return await loginService(req, res);
}

//logout controller to clear cookies
export const logoutController = async (req: Request, res: Response) => {
  try {
    clearAuthCookies(res);
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    return handleError(res, 500, "Internal server error during logout");
  }
}

