import express from "express";
import { createOrderFromCartController } from "@/controller/orderItemController";
import { authMiddleware } from "@/middleware/authMiddleware";

const router = express.Router();

// POST /api/order-item
router.post("/order-from-cart", authMiddleware, createOrderFromCartController);

export default router;
