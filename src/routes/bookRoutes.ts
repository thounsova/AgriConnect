import { Router } from "express";
import {
  authMiddleware,
  checkRoleMiddleware,
} from "@/middleware/authMiddleware";
import {
  createBookController,
  getBookController,
  getBookByIdController,
  updatedBookController,
  deleteBookController,
} from "@/controller/bookController";

const bookRouter = Router();

// Admin-only routes
bookRouter.post(
  "/create-books",
  authMiddleware,
  checkRoleMiddleware("admin"),
  createBookController
);
bookRouter.put(
  "/updated-books/:id",
  authMiddleware,
  checkRoleMiddleware("admin"),
  updatedBookController
);
bookRouter.delete(
  "/deleted-books/:id",
  authMiddleware,
  checkRoleMiddleware("admin"),
  deleteBookController
);

// Public routes
bookRouter.get("/books", getBookController);
bookRouter.get("/books/:id", getBookByIdController);

export default bookRouter;
