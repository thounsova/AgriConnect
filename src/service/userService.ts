import { userModel } from "@/models/userModel";
import { Request, Response } from "express";
import { handleError } from "@/utils/response-util";

// Service to get all users
export const getAllUserService = async (req: Request, res: Response) => {
  try {
    // Fetch all users, exclude password
    const users = await userModel.find().select("-password");

    if (!users || users.length === 0) {
      return handleError(res, 404, "No users found");
    }

    return res.status(200).json({
      message: "Users retrieved successfully",
      data: users, // users include roles array
    });
  } catch (error) {
    console.error(error);
    return handleError(res, 500, "Internal server error");
  }
};

//Service to get all users have role 'farmer' 
export const getAllFarmersService = async (req: Request, res: Response) => {
  try {
    // Fetch all users with role 'farmer', exclude password
    const farmers = await userModel.find({ roles: "farmer" }).select("-password");

    if (!farmers || farmers.length === 0) {
      return handleError(res, 404, "No farmers found");
    }

    return res.status(200).json({
      message: "Farmers retrieved successfully",
      data: farmers, // farmers include roles array
    });
  } catch (error) {
    console.error(error);
    return handleError(res, 500, "Internal server error");
  }
};