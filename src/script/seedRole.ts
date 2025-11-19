import mongoose from "mongoose";
import dotenv from "dotenv";
import { roleModel } from "../models/roleModel";

dotenv.config();

async function seedRoles() {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) throw new Error("MONGODB_URI missing in .env");

    await mongoose.connect(mongoURI);
    console.log(" MongoDB connected");

    const roles = [
      {
        name: "Customer",
        description: "Can view products and place orders",
      },
      {
        name: "Farmer",
        description: "Can manage farms and products",
      },
    ];

    for (const role of roles) {
      const exists = await roleModel.findOne({ name: role.name });

      if (!exists) {
        await roleModel.create(role);
        console.log(`Role "${role.name}" added.`);
      } else {
        console.log(`Role "${role.name}" already exists.`);
      }
    }

    console.log(" Role seeding completed!");
  } catch (err) {
    console.error(" Seeding error:", err);
  } finally {
    await mongoose.disconnect();
  }
}

seedRoles();
