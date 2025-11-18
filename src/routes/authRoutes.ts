import { Router } from "express";
import {
  addFarmerController,

  logoutController,
 
} from "@/controller/authController";
import { addRoleController, removeRoleController } from "@/controller/roleController";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin related endpoints
 */

/**
 * @swagger
 * /api/Create-user:
 *   post:
 *     summary: Add a new user
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
 *            
 *     responses:
 *       201:
 *         description: Farmer added successfully
 *       409:
 *         description: User already exists
 *       500:
 *         description: Server error
 */
router.post("/Create-user", addFarmerController);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary:  login
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
// router.post("/login", loginController);

// /**
//  * @swagger
//  * /api/logout:
//  *   post:
//  *     summary:  logout
//  *     tags: [Admin]
//  *     responses:
//  *       200:
//  *         description: Logout successful
//  *       500:
//  *         description: Server error
//  */
// router.post("/logout", logoutController);

// /**
//  * @swagger
//  * /api/add-role:
//  *   post:
//  *     summary: Add a role to a user
//  *     tags: [Admin]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - userId
//  *               - role
//  *             properties:
//  *               userId:
//  *                 type: string
//  *                 example: "64f123abc..."
//  *               role:
//  *                 type: string
//  *                 example: "admin"
//  *     responses:
//  *       200:
//  *         description: Role added successfully
//  *       404:
//  *         description: User not found
//  *       500:
//  *         description: Server error
//  */
// router.post("/add-role", addRoleController);

// /**
//  * @swagger
//  * /api/remove-role:
//  *   post:
//  *     summary: Remove a role from a user
//  *     tags: [Admin]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - userId
//  *               - role
//  *             properties:
//  *               userId:
//  *                 type: string
//  *                 example: "64f123abc..."
//  *               role:
//  *                 type: string
//  *                 example: "farmer"
//  *     responses:
//  *       200:
//  *         description: Role removed successfully
//  *       404:
//  *         description: User not found
//  *       500:
//  *         description: Server error
//  */
// router.post("/remove-role", removeRoleController);

export default router;
