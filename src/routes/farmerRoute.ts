// routes/farmerRoute.ts
import { Router } from "express";
import { authMiddleware, checkRoleMiddleware } from "@/middleware/authMiddleware";
import { getAllFarmersController } from "@/controller/farmerControler";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Farmer
 *   description: Farmer related endpoints
 */

/**
 * @swagger
 * /api/get-farmeies:
 *   get:
 *     summary: Get all farmers with user details
 *     tags: [Farmer]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of farmers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Farmers retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         format: ObjectId
 *                       user_id:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             format: ObjectId
 *                           full_name:
 *                             type: string
 *                           email:
 *                             type: string
 *                           phone:
 *                             type: string
 *                           address:
 *                             type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/get-farmeies", authMiddleware, checkRoleMiddleware("Admin"), getAllFarmersController);

export default router;
