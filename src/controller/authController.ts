import { Request, Response } from "express";
import { loginService, refreshTokenService, logoutService } from "@/service/authService";



export const loginController = async (req: Request, res: Response) => {
  const loginResult = await loginService(req, res);
  return loginResult;
};

export const logoutController = async(req: Request, res: Response) => {
  const logoutResult = await logoutService(req, res);
  return logoutResult;
}

export const refreshtokenController = async(req: Request, res: Response) => {
  const refreshTokenResult = await refreshTokenService(req, res);
  return refreshTokenResult;
}
