import { Router } from "express";
import AuthRouter from "./authRoutes";
import bookRouter from "./bookRoutes";
import userRouter from "./userRoutes";
import categoryRoute from "./categoryRoute";
import orderItemRoute from "./orderItemRoutes";
import cartRoutes from "./cartRoutes";
import AuthorRouter from "./authorRoute";

const router = Router();

// Author route
router.use("/", AuthorRouter);

// order route
router.use("/", orderItemRoute);

// category route
router.use("/", categoryRoute);

// book route
router.use("/", bookRouter);

// Auth route
router.use("/auth", AuthRouter);

// Users Routes
router.use("/", userRouter);

// Cart route
router.use("/cart", cartRoutes);


export default router;

