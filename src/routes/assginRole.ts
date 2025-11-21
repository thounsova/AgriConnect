// routes/adminRoute.ts
import { Router } from "express";
import { assignFarmerController } from "@/controller/roleController";
import { authMiddleware  , checkRoleMiddleware } from "@/middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * /api/admin/assign-farmer:
 *   post:
 *     summary: Admin assigns Farmer role to any user
 *     tags:
 *       - Admin
 *     security:
 *        - BearerAuth: []    # <-- JWT required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 691e66883168fcdc64da994e
 *     responses:
 *       200:
 *         description: Farmer role assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.post("/assign-farmer", authMiddleware, checkRoleMiddleware("Admin"), assignFarmerController);

export default router;
