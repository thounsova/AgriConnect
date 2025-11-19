import { Request, Response } from "express";
import { createProductService } from "@/service/productService";

export const addProductController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const productData = req.body;
    const product = await createProductService(userId, productData);

    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};
