import { roleModel } from "@/models/roleModel";
import { userRoleModel } from "@/models/userRoleModel";

export const assignFarmerRoleToUser = async (targetUserId: string) => {
  // Find Farmer role
  const farmerRole = await roleModel.findOne({ name: "Farmer" });
  if (!farmerRole) throw new Error("Farmer role not found");

  // Check if user already has Farmer
  const already = await userRoleModel.findOne({
    user_id: targetUserId,
    role_id: farmerRole._id,
  });

  if (already) return "User already has Farmer role";

  // Assign Farmer role
  await userRoleModel.create({
    user_id: targetUserId,
    role_id: farmerRole._id,
  });

  return "Farmer role assigned successfully";
};
