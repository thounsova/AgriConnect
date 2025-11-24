import { FarmerModel } from "@/models/farmerModel";
import { userModel
 } from "@/models/userModel";
 import { Request, Response } from "express";
 import { handleError } from "@/utils/response-util";
 import { roleModel } from "@/models/roleModel";

 // Create a new farmer profile
 

 

export const getFarmerWithUserDetails = async (farmerId: string) => {
  const farmer = await FarmerModel.findById(farmerId).populate(
    "user_id", 
    "full_name email phone address" 
  );

  if (!farmer) throw new Error("Farmer not found");

  return farmer;
};

// Get all farmers with user details
export const getAllFarmersWithUserDetails = async () => {
  const farmers = await FarmerModel.find().populate(
    "user_id",
    "full_name email phone address"
  );
  return farmers;
};


