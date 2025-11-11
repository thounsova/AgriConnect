import { Router } from "express";
import {
  addFarmerController
} from "@/controller/userController";
import {
  authMiddleware,
  checkRoleMiddleware,
} from "@/middleware/authMiddleware";

const userRouter = Router();

userRouter.post(
  "/add-farmer",
  authMiddleware,
  checkRoleMiddleware("admin"),
  addFarmerController
);

export default userRouter;
