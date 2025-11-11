import express from "express";
import {
    loginController,
    logoutController,
    refreshtokenController
} from "@/controller/authController";
const AuthRouter = express.Router();

AuthRouter.post("/login", loginController);
AuthRouter.post("/refresh", refreshtokenController);
AuthRouter.post("/logout", logoutController);

export default AuthRouter;
