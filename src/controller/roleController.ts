// controller/adminController.ts
import { Request, Response } from "express";
import { assignFarmerRoleToUser } from "@/service/roleService";
import { userRoleModel } from "@/models/userRoleModel";

export const assignFarmerController = async (req: Request, res: Response) => {
  try {
    // Admin ID from token (for auth only, not target)
    const adminId = req.user?._id;
    if (!adminId) return res.status(401).json({ message: "Unauthorized" });

    // Target userId from request body
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "userId is required" });

    // Assign Farmer role
    const result = await assignFarmerRoleToUser(userId);

    // Fetch updated roles of target user
    const userRoles = await userRoleModel
      .find({ user_id: userId })
      .populate("role_id");

    const roles = userRoles.map(r => (r.role_id as any).name);

    return res.status(200).json({
      message: result,
      roles,
    });

  } catch (err: any) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
