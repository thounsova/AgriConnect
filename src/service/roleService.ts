import { roleModel } from "@/models/roleModel";
import { userRoleModel } from "@/models/userRoleModel";

export const ensureUserIsFarmer = async (userId: string) => {
  const farmerRole = await roleModel.findOne({ name: "Farmer" });
  if (!farmerRole) throw new Error("Farmer role not found");

  const existing = await userRoleModel.findOne({ userId, roleId: farmerRole._id });
  if (!existing) {
    await userRoleModel.create({ userId, roleId: farmerRole._id });
  }

  return true;
};
