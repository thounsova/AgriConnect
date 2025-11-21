// service/productService.ts
import { ProductModel } from "@/models/productModel";
import { FarmerModel } from "@/models/farmerModel";
import { categoryModel } from "@/models/categoryModel";
import { Request, Response } from "express";

export const createProductService = async (req: Request, res: Response) => {
  try {
    const { name, price, stock, category_id } = req.body;
    const farmer_id = req.user?._id; // from JWT token

    if (!name || !price || !stock || !category_id) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Check if farmer profile exists
    const farmer = await FarmerModel.findOne({ user_id: farmer_id });
    if (!farmer) {
      return res.status(400).json({ message: "Farmer profile not found" });
    }

    // Check if category exists
    const category = await categoryModel.findById(category_id);
    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }

    // Create product (status defaults to "active")
    const product = await ProductModel.create({
      name,
      price,
      stock,
      category_id,
      status: "active", // default
      farmer_id: farmer._id,
    });

    res.status(201).json({
      message: "Product created successfully",
      data: product,
    });

  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
