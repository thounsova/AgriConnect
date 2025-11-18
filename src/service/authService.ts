import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { userModel } from "../models/userModel";
import { roleModel } from "../models/roleModel";
import { userRoleModel } from "../models/userRoleModel";
import { generateTokens } from "../utils/token";
import { setAuthCookies, clearAuthCookies } from "../utils/cookie";

// REGISTER USER
export const addUserService = async (req: Request, res: Response) => {
  try {
    const { full_name, email, password, phone, address, roles } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      full_name,
      email,
      password: hashedPassword,
      phone,
      address,
      status: "active",
    });

    // Assign roles (default Customer)
    let roleDocs;
    if (roles && roles.length > 0) {
      roleDocs = await roleModel.find({ name: { $in: roles } });
    } else {
      const defaultRole = await roleModel.findOne({ name: "Customer" });
      if (!defaultRole)
        return res.status(500).json({ message: "Default role 'Customer' not found" });
      roleDocs = [defaultRole];
    }

    await Promise.all(
      roleDocs.map(async (role) => {
        await userRoleModel.updateOne(
          { user_id: newUser._id, role_id: role._id },
          { user_id: newUser._id, role_id: role._id },
          { upsert: true }
        );
      })
    );

    const roleNames = roleDocs.map((r) => r.name);

    const token = generateTokens(newUser._id.toString(), newUser.email, roleNames);
    setAuthCookies(res, token.accessToken, token.refreshToken);

    return res.status(201).json({
      message: "User registered successfully",
      user: { _id: newUser._id, full_name, email, phone, address, roles: roleNames },
      token,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: `Registration failed: ${error.message}` });
  }
};

// LOGIN USER
export const loginUserService = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

    const userRoles = await userRoleModel.find({ user_id: user._id }).populate("role_id", "name");
    const roleNames = userRoles.map((r: any) => r.role_id.name);

    const token = generateTokens(user._id.toString(), user.email, roleNames);
    setAuthCookies(res, token.accessToken, token.refreshToken);

    return res.status(200).json({
      message: "Login successful",
      user: { _id: user._id, full_name: user.full_name, email, phone: user.phone, address: user.address, roles: roleNames },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Login failed" });
  }
};

// LOGOUT USER
export const logoutUserService = async (req: Request, res: Response) => {
  try {
    clearAuthCookies(res);
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Logout failed" });
  }
};
