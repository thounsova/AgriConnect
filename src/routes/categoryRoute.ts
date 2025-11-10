import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "@/controller/categoryController";
import { authMiddleware, checkRoleMiddleware } from "@/middleware/authMiddleware";

const categorieyRouter = Router();

// Protected routes (require authentication)
categorieyRouter.post("/create-categories", authMiddleware, checkRoleMiddleware("admin"), createCategory);
categorieyRouter.put("/updated-categories/:id", authMiddleware, checkRoleMiddleware("admin"), updateCategory);
categorieyRouter.delete("/deleted-categories/:id", authMiddleware, checkRoleMiddleware("admin"), deleteCategory);

// Public routes
categorieyRouter.get("/categories", authMiddleware, checkRoleMiddleware("admin"), getCategories);
categorieyRouter.get("/categories/:id", authMiddleware, checkRoleMiddleware("admin"), getCategoryById);

export default categorieyRouter;
