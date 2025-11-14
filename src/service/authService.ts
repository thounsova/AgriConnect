import bcrypt from "bcrypt";
import { userModel } from "@/models/userModel";
import { generateTokens } from "@/utils/token";
import { Request, Response } from "express";
import { handleError } from "@/utils/response-util";
import { setAuthCookies } from "@/utils/cookie";

// Service to add a new farmer (or any user)
export const addFarmerService = async (req: Request, res: Response) => {
  try {
    const { full_name, email, address, password, phone, roles } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return handleError(res, 401, "User already exists");
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new userModel({
      full_name,
      phone,
      email,
      address,
      password: hashPassword,
      roles: Array.isArray(roles) && roles.length > 0 ? roles : ["farmer"], // ✅ roles array
    });

    await newUser.save();

    // Generate tokens
    const token = generateTokens(
      newUser._id.toString(),
      newUser.email,
      newUser.roles || ["farmer"]
    );

    // Set tokens in cookies
    setAuthCookies(res, token.accessToken, token.refreshToken);

    // Respond with user data AND token
    return res.status(201).json({
      message: "User registered successfully",
      data: {
        user: {
          _id: newUser._id,
          full_name: newUser.full_name,
          phone: newUser.phone,
          address: newUser.address,
          email: newUser.email,
          roles: newUser.roles,
        },
        token,
      },
    });
  } catch (error) {
    console.error(error);
    return handleError(res, 500, "An error occurred during registration");
  }
};

// Login service to authenticate user and generate tokens
export const loginService = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return handleError(res, 404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return handleError(res, 401, "Invalid credentials");
    }

    // Generate tokens
    const token = generateTokens(
      user._id.toString(),
      user.email,
      user.roles || ["farmer"]
    );

    // Set tokens in cookies
    setAuthCookies(res, token.accessToken, token.refreshToken);

    // Respond with user data AND token
    return res.status(200).json({
      message: "Login successful",
      data: {
        user: {
          _id: user._id,
          full_name: user.full_name,
          phone: user.phone,
          address: user.address,
          email: user.email,
          roles: user.roles,
        },
        token,
      },
    });
  } catch (error) {
    console.error(error);
    return handleError(res, 500, "An error occurred during login");
  }
};

// Logout service to clear authentication cookies
export const logoutService = async (req: Request, res: Response) => {
  try {
    setAuthCookies(res, "", ""); // clear cookies
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    return handleError(res, 500, "An error occurred during logout");
  }
};
