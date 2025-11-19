import { Router } from "express";
import { addProductController } from "@/controller/productController";
import { authMiddleware } from "@/middleware/authMiddleware";

const productRoute = Router();

/**
 * @swagger
 * /api/product/create-product:
 *   post:
 *     tags:
 *       - Product
 *     summary: Create a product (auto-promote user to Farmer)
 *     security:
 *       - BearerAuth: []    # <-- JWT required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Organic Tomato
 *               price:
 *                 type: number
 *                 example: 4.5
 *               stock:
 *                 type: number
 *                 example: 100
 *               category:
 *                 type: string
 *                 example: Vegetable
 *               status:
 *                 type: string
 *                 enum: [active, out of stock]
 *                 example: active
 *     responses:
 *       201:
 *         description: Product created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
productRoute.post("/create-product", authMiddleware, addProductController);


export default productRoute;
