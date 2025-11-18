import { Request, Response } from "express";
import { userModel } from "@/models/userModel";
import { roleModel } from "@/models/roleModel";
import { userRoleModel } from "@/models/userRoleModel";
import { handleError } from "@/utils/response-util";

// =======================
// ADD ROLE TO USER
// =======================
export const addRoleService = async (req: Request, res: Response) => {
  try {
    const { userId, roleName } = req.body;
    if (!roleName) return handleError(res, 400, "Role name is required");

    const user = await userModel.findById(userId);
    if (!user) return handleError(res, 404, "User not found");

    const role = await roleModel.findOne({ name: roleName });
    if (!role) return handleError(res, 404, "Role not found");

    // Check if role already assigned
    const existing = await userRoleModel.findOne({ userId, roleId: role._id });
    if (existing) return handleError(res, 400, "User already has this role");

    // Assign role
    await userRoleModel.create({ userId: user._id, roleId: role._id });

    return res.status(200).json({
      message: "Role added successfully",
    });
  } catch (error) {
    console.error(error);
    return handleError(res, 500, "Error adding role");
  }
};

// =======================
// REMOVE ROLE FROM USER
// =======================
export const removeRoleService = async (req: Request, res: Response) => {
  try {
    const { userId, roleName } = req.body;
    if (!roleName) return handleError(res, 400, "Role name is required");

    const user = await userModel.findById(userId);
    if (!user) return handleError(res, 404, "User not found");

    const role = await roleModel.findOne({ name: roleName });
    if (!role) return handleError(res, 404, "Role not found");

    // Remove role assignment
    await userRoleModel.deleteOne({ userId, roleId: role._id });

    return res.status(200).json({
      message: "Role removed successfully",
    });
  } catch (error) {
    console.error(error);
    return handleError(res, 500, "Error removing role");
  }
};

