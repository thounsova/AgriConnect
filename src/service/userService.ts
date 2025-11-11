import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { userModel, IUser } from "@/models/userModel";
import { handleError } from "@/utils/response-util";

// Token type
interface Tokens {
  accessToken: string;
  refreshToken: string;
}

// Generate tokens safely using .env
const generateTokens = (userId: string, email: string, role: string): Tokens => {
  const accessSecret = process.env.JWT_ACCESS_SECRET!;
  const refreshSecret = process.env.JWT_REFRESH_SECRET!;

  // Cast expiresIn to any to satisfy TypeScript
  const accessOptions: SignOptions = {
    expiresIn: process.env.JWT_ACCESS_EXPIRES as any || "15m",
  };

  const refreshOptions: SignOptions = {
    expiresIn: process.env.JWT_REFRESH_EXPIRES as any || "7d",
  };

  const accessToken = jwt.sign({ id: userId, email, role }, accessSecret, accessOptions);
  const refreshToken = jwt.sign({ id: userId }, refreshSecret, refreshOptions);

  return { accessToken, refreshToken };
};

// Add farmer service
export const addFarmerservice = async (req: Request, res: Response) => {
  try {
    const { full_name, email, address, password, phone, role } = req.body;

    if (!full_name || !email || !password) {
      return handleError(res, 400, "Full name, email, and password are required.");
    }

    const existingUser: IUser | null = await userModel.findOne({ email });
    if (existingUser) return handleError(res, 409, "User already exists.");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: IUser = new userModel({
      full_name,
      email,
      address,
      password: hashedPassword,
      phone,
      role: role || "farmer",
    });

    await newUser.save();

    let token: Tokens | null = null;
    try {
      token = generateTokens(newUser._id.toString(), newUser.email, newUser.role || "farmer");
    } catch (err) {
      console.error("Token generation failed:", err);
    }

    return res.status(201).json({
      message: "User added successfully",
      data: {
        user: {
          _id: newUser._id,
          full_name: newUser.full_name,
          email: newUser.email,
          address: newUser.address,
          phone: newUser.phone,
          role: newUser.role || "farmer",
        },
        token, // accessToken & refreshToken
      },
    });

  } catch (error: any) {
    console.error("Error adding farmer:", error);
    if (error.code === 11000 && error.keyValue?.email) {
      return handleError(res, 409, "Email already exists.");
    }
    return handleError(res, 500, "An error adding farmer.");
  }
};
