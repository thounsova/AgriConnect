import mongoose from "mongoose";
import dotenv from "dotenv";
import { roleModel } from "../models/roleModel"; // relative path

dotenv.config();

async function seedCustomerRole() {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) throw new Error("MONGODB_URI missing in .env");

    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected");

    const roleName = "Customer";
    const description = "Can view products and place orders";

    const exists = await roleModel.findOne({ name: roleName });
    if (!exists) {
      await roleModel.create({ name: roleName, description });
      console.log(`Role "${roleName}" added.`);
    } else {
      console.log(`Role "${roleName}" already exists.`);
    }

    console.log("✅ Customer role seeding completed!");
  } catch (err) {
    console.error("❌ Seeding error:", err);
  } finally {
    await mongoose.disconnect();
  }
}

seedCustomerRole();
