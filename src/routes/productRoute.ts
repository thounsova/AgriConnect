// routes/productRoute.ts
import { Router } from "express";
import { authMiddleware, checkRoleMiddleware } from "@/middleware/authMiddleware";
import { createProductController } from "@/controller/productController";

const router = Router();

/**
 * @swagger
 * /api/product/create-product:
 *   post:
 *     summary: Create a new product (status defaults to "active")
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mango
 *               price:
 *                 type: number
 *                 example: 10
 *               stock:
 *                 type: number
 *                 example: 100
 *               category_id:
 *                 type: string
 *                 example: 64abc123f8a1b2c3d4e5f678
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/create-product", authMiddleware, createProductController);

export default router;
