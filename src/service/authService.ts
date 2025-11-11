import bcrypt from "bcrypt";
import { userModel } from "@/models/userModel";
import { generateTokens } from "@/utils/jwt";
import { Request, Response } from "express";
import { handleError } from "@/utils/response-util";
import jwt from "jsonwebtoken";



export const loginService = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const existUser = await userModel.findOne({ email });
        if (!existUser) {
            return handleError(res, 400, "Invalid credentials");
        }

        const isValidPassword = await bcrypt.compare(password, existUser.password);
        if (!isValidPassword) {
            return handleError(res, 400, "Invalid credentials");
        }

        const { accessToken, refreshToken } = generateTokens(
            existUser._id.toString(),
            existUser.email,
            existUser.role
        );

        // Save refresh token in DB
        existUser.refreshToken = refreshToken;
        await existUser.save();

        // Send refresh token as HttpOnly cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(200).json({
            message: "Login Successful",
            accessToken,
            data: {
                user: {
                    _id: existUser._id,
                    full_name: existUser.full_name,
                    user_name: existUser.address,
                    email: existUser.email,
                    phone: existUser.phone,
                    role: existUser.role,
                },
            },
        });
    } catch (error) {
        console.error("Login Service Error:", error);
        return handleError(res, 500, "Login failed. Please try again later.");
    }
};

export const logoutService = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const findUser = await userModel.findOne({ refreshToken });
      if (findUser) {
        (findUser.refreshToken = ""), await findUser.save();
      }
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return handleError(res, 500, "False to logout");
  }
};

export const refreshTokenService = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return handleError(res, 401, "No refresh token provided.");
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string
    ) as { id: string };

    const user = await userModel.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return handleError(res, 403, "Invalid refresh token.");
    }

    // Generate new token
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user._id.toString(),
      user.email,
      user.role
    );

    // Update refresh token
    user.refreshToken = newRefreshToken;
    await user.save();

    // Update cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send access token
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    console.error(error);
    return handleError(res, 403, "Token expired or invalid");
  }
};
