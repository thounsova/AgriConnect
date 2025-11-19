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

    // Read admin info from env
    const adminEmail = process.env.ADMIN_EMAIL ;
    const adminPassword = process.env.ADMIN_PASSWORD ;
    const adminFullName = process.env.ADMIN_FULL_NAME ;
    const adminPhone = process.env.ADMIN_PHONE ;
    const adminAddress = process.env.ADMIN_ADDRESS ;
    const adminRoleName = process.env.ADMIN_ROLE_NAME ;

    // Validate required admin env vars so TypeScript can narrow types
    if (!adminEmail) throw new Error("ADMIN_EMAIL missing in .env");
    if (!adminPassword) throw new Error("ADMIN_PASSWORD missing in .env");
    if (!adminFullName) throw new Error("ADMIN_FULL_NAME missing in .env");
    if (!adminRoleName) throw new Error("ADMIN_ROLE_NAME missing in .env");

    // 1️ Seed Admin role
    let adminRole = await roleModel.findOne({ name: adminRoleName });
    if (!adminRole) {
      adminRole = await roleModel.create({
        name: adminRoleName,
        description: "Has full access to the system",
      });
      console.log(`Role ${adminRoleName} created`);
    } else {
      console.log(`Role ${adminRoleName} already exists`);
    }

    // 2️ Seed Admin user
    let adminUser = await userModel.findOne({ email: adminEmail });
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      adminUser = await userModel.create({
        full_name: adminFullName,
        email: adminEmail,
        password: hashedPassword,
        phone: adminPhone,
        address: adminAddress,
      });

      console.log("Admin user created!");
    } else {
      console.log("Admin user already exists");
    }

    // 3️ Link Admin user to Admin role in UserRole
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

    console.log("Admin seeding complete!");
  } catch (err) {
    console.error("Error seeding Admin:", err);
  } finally {
    if (connection) await mongoose.disconnect();
    process.exit(0);
  }
}

seedAdmin();
