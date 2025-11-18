import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refreshsecret";

export const generateTokens = (userId: string, email: string, roles: string[]) => {
  const accessToken = jwt.sign({ userId, email, roles }, JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ userId, email }, JWT_REFRESH_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};
