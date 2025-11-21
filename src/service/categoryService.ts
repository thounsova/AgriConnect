import { Request, Response } from "express";
import { categoryModel } from "@/models/categoryModel";
import { handleError } from "@/utils/response-util";

// Service to create a new category
export const createCategoryService = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    // Validate input
    if (!name) {
      return handleError(res, 400, "Category name is required");
    }

    if (!description) {
      return handleError(res, 400, "Category description is required");
    }

    // Check if category already exists
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return handleError(res, 400, "Category already exists");
    }

    // Create new category
    const newCategory = await categoryModel.create({
      name,
      description,
    });

    // Return response
    return res.status(201).json({
      message: "Category created successfully",
      data: newCategory,
    });

  } catch (error) {
    return handleError(res, 500, "Internal server error");
  }
};

