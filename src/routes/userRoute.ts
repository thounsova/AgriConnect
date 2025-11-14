import { Router } from "express";
import { getAllUserController } from "@/controller/userController";
import { authMiddleware, checkRoleMiddleware } from "@/middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management endpoints
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       401:
 *         description: Unauthorized - no token
 *       403:
 *         description: Forbidden - insufficient role
 *       404:
 *         description: No users found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/users",
//   authMiddleware,
//   checkRoleMiddleware("admin"),
  getAllUserController
);

export default router;
