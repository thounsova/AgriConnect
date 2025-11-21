// controller/productController.ts
import { Request, Response } from "express";
import { createProductService } from "@/service/productService";

export const createProductController = async (req: Request, res: Response) => {
  await createProductService(req, res);
};
