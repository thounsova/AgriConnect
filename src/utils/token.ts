import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface TokenPayload {
  userId: string;
  email: string;
  roles?: string[];
}

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export const generateTokens = ({ userId, email, roles }: TokenPayload) => {
  const accessToken = jwt.sign({ userId, email, roles }, JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ userId, email }, JWT_REFRESH_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string) => jwt.verify(token, JWT_SECRET);
export const verifyRefreshToken = (token: string) => jwt.verify(token, JWT_REFRESH_SECRET);
