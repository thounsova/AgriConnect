// import { Router } from "express";
// import { getAllUserController , getAllFarmersController } from "@/controller/userController";
// import { authMiddleware, checkRoleMiddleware } from "@/middleware/authMiddleware";

// const router = Router();

// /**
//  * @swagger
//  * /api/users:
//  *   get:
//  *     summary: Retrieve a list of all users
//  *     tags: [Users]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Users retrieved successfully
//  *       401:
//  *         description: Unauthorized - no token
//  *       403:
//  *         description: Forbidden - insufficient role
//  *       404:
//  *         description: No users found
//  *       500:
//  *         description: Internal server error
//  */
// router.get(
//   "/users",
//   authMiddleware,
//   checkRoleMiddleware("admin"),
//   getAllUserController
// );

// //Get all farmers
// /**
//  * @swagger
//  * /api/farmers:
//  *   get:
//  *     summary: Retrieve a list of all farmers
//  *     tags: [Users]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Farmers retrieved successfully
//  *       401:
//  *         description: Unauthorized - no token
//  *       403:
//  *         description: Forbidden - insufficient role
//  *       404:
//  *         description: No farmers found
//  *       500:
//  *         description: Internal server error
//  */

// router.get(
//   "/farmers",
//   authMiddleware,
//   checkRoleMiddleware("admin"),
//   getAllFarmersController
// );


// export default router;
