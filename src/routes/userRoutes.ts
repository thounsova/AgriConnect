import { Router } from "express";
import {
  getUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
  getMeController,
} from "@/controller/userController";
import {
  authMiddleware,
  checkRoleMiddleware,
} from "@/middleware/authMiddleware";

const userRouter = Router();

// Admin-only routes
userRouter.get(
  "/users",
  authMiddleware,
  checkRoleMiddleware("admin"),
  getUsersController
);
userRouter.get(
  "/users/:id",
  authMiddleware,
  checkRoleMiddleware("admin"),
  getUserByIdController
);
userRouter.put(
  "/updated-users/:id",
  authMiddleware,
  checkRoleMiddleware("admin"),
  updateUserController
);
userRouter.delete(
  "/deleted-users/:id",
  authMiddleware,
  checkRoleMiddleware("admin"),
  deleteUserController
);

// User self-profile route (optional)
userRouter.get("/users/profile/me", authMiddleware, getMeController);

export default userRouter;
