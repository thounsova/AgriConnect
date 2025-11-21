import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { userModel } from "../models/userModel";
import { roleModel } from "../models/roleModel";
import { userRoleModel } from "../models/userRoleModel";
import { generateTokens } from "../utils/token";
import {setAuthCookies} from "../utils/cookie";
import { FarmerModel } from "../models/farmerModel";

// REGISTER (All users → Customer)
export const addUserService = async (req: Request, res: Response) => {
  try {
    const { full_name, email, password, phone, address } = req.body;

    // Check if user exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await userModel.create({ full_name, email, password: hashedPassword, phone, address });

    // Assign role automatically
    const role = await roleModel.findOne({ name: "Customer" });
    if (role) {
      await userRoleModel.create({ user_id: newUser._id, role_id: role._id });
    }

    // Get roles for token
    const roles = role ? [role.name] : ["Customer"];

    // Generate JWT tokens
    const { accessToken, refreshToken } = generateTokens({
      userId: newUser._id.toString(),
      email: newUser.email,
      roles,
    });

    // Set tokens in HttpOnly cookies
    setAuthCookies(res, accessToken, refreshToken); 


    // Prepare response data (exclude password)
    const userResponse = {
      id: newUser._id,
      full_name: newUser.full_name,
      email: newUser.email,
      phone: newUser.phone,
      address: newUser.address,
      roles,
    };

    // Return user data + tokens
    res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
      accessToken,
     
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN (All users)
export const loginService = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Get user roles from userRoleModel
    const userRoles = await userRoleModel.find({ user_id: user._id }).populate("role_id");
    const roles = userRoles.map((ur) => (ur.role_id as any).name);

    // ✅ Check if user has a Farmer record and add "Farmer" role if missing
    const hasFarmerRecord = await FarmerModel.findOne({ user_id: user._id });
    if (hasFarmerRecord && !roles.includes("Farmer")) {
      roles.push("Farmer");
    }

    // Generate JWT tokens
    const { accessToken, refreshToken } = generateTokens({
      userId: user._id.toString(),
      email: user.email,
      roles,
    });

    // Set tokens in HttpOnly cookies
    setAuthCookies(res, accessToken, refreshToken);

    // Prepare response data
    const userResponse = {
      id: user._id,
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      roles,
    };

    // Return user data + tokens
    res.status(200).json({
      message: "Login successful",
      user: userResponse,
      accessToken,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



   

