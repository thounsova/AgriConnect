// controller/farmerController.ts
import { Request, Response } from "express";
import {  getAllFarmersWithUserDetails } from "@/service/farmerService";



export const getAllFarmersController = async (_req: Request, res: Response) => {
  try {
    const farmers = await getAllFarmersWithUserDetails();
    res.status(200).json({ message: "Farmers fetched successfully", data: farmers });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
