import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { roleModel } from "../models/roleModel";
import { userModel } from "../models/userModel";
import { userRoleModel } from "../models/userRoleModel";

dotenv.config();

async function seedAdmin() {
  let connection: typeof mongoose | null = null;

  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error("MONGODB_URI missing in .env");

    connection = await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    // 1️⃣ Seed Admin role
    let adminRole = await roleModel.findOne({ name: "Admin" });
    if (!adminRole) {
      adminRole = await roleModel.create({
        name: "Admin",
        description: "Has full access to the system",
      });
      console.log("Role Admin created");
    } else {
      console.log("Role Admin already exists");
    }

    // 2️⃣ Seed Admin user
    const adminEmail = "admin@gmail.com";
    let adminUser = await userModel.findOne({ email: adminEmail });

    if (!adminUser) {
      const hashedPassword = await bcrypt.hash("Admin@123", 10);

      adminUser = await userModel.create({
        full_name: "Super Admin",
        email: adminEmail,
        password: hashedPassword,
        phone: "+85599999999",
        address: "Phnom Penh, Cambodia",
      });

      console.log("🎉 Admin user created!");
    } else {
      console.log("Admin user already exists");
    }

    // 3️⃣ Link Admin user to Admin role in UserRole
    const existingUserRole = await userRoleModel.findOne({
      user_id: adminUser._id,
      role_id: adminRole._id,
    });

    if (!existingUserRole) {
      await userRoleModel.create({
        user_id: adminUser._id,
        role_id: adminRole._id,
      });
      console.log("UserRole for Admin user created");
    } else {
      console.log("UserRole for Admin user already exists");
    }

    console.log("✅ Admin seeding complete!");
  } catch (err) {
    console.error("❌ Error seeding Admin:", err);
  } finally {
    if (connection) await mongoose.disconnect();
    process.exit(0);
  }
}

seedAdmin();
