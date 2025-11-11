import { Router } from "express";
import userRouter from "./userRoutes";

const router = Router();

// Users Routes
router.use("/", userRouter);




export default router;
