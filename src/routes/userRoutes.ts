import { Router } from "express";
import { addFarmerController } from "@/controller/userController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Farmers
 *   description: Farmer management
 */

/**
 * @swagger
 * /api/farmers:
 *   post:
 *     summary: Add a new farmer
 *     tags: [Farmers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - email
 *               - password
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: "Vichea"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "vichea@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "SecurePass789"
 *               address:
 *                 type: string
 *                 example: "Kampong Cham, Cambodia"
 *               phone:
 *                 type: string
 *                 example: "+85577788899"
 *               role:
 *                 type: string
 *                 enum: ["farmer", "admin"]
 *                 default: "farmer"
 *     responses:
 *       201:
 *         description: Farmer added successfully
 *       409:
 *         description: User already exists
 *       500:
 *         description: Server error
 */
router.post("/farmers", addFarmerController);

export default router;
