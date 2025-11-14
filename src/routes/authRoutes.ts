import { Router } from "express";
import { addFarmerController, loginController , logoutController } from "@/controller/authController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin  related endpoints
 */

/**
 * @swagger
 * /api/add-farmers:
 *   post:
 *     summary: Add a new farmer
 *     tags: [Admin]
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
 *     responses:
 *       201:
 *         description: Farmer added successfully
 *       409:
 *         description: User already exists
 *       500:
 *         description: Server error
 */
router.post("/add-farmers", addFarmerController);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Farmer login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "vichea@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "SecurePass789"
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post("/login", loginController);


/** * @swagger
 * /api/logout:
 *   post:
 *     summary: Farmer logout
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Logout successful
 *       500:
 *         description: Server error
 */
router.post("/logout", logoutController);   
export default router;
