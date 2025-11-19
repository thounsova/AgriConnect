// src/service/productService.ts
import { ProductModel } from "@/models/productModel";
import { ensureUserIsFarmer } from "@/service/roleService";

/**
 * Create a new product and automatically promote the user to Farmer if needed
 * @param userId - User ID extracted from JWT
 * @param data - Product data { name, price, stock, category, status }
 * @returns The created product
 */
export const createProductService = async (userId: string, data: any) => {
  try {
    // 1️⃣ Ensure user has Farmer role
    await ensureUserIsFarmer(userId);

    // 2️⃣ Create product
    const product = await ProductModel.create({
      name: data.name,
      price: data.price,
      stock: data.stock,
      category: data.category,
      status: data.status ?? "active",
      user_id_id: userId,
    });

    return product;
  } catch (error: any) {
    throw new Error(error.message || "Failed to create product");
  }
};
