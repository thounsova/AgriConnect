import jwt, { SignOptions } from "jsonwebtoken";

const accessSecret = process.env.JWT_ACCESS_SECRET as string;
const refreshSecret = process.env.JWT_REFRESH_SECRET as string;

export const generateTokens = (userId: string, email: string, role: string) => {
  const payload = { _id: userId, email, role };

const accessOptions: SignOptions = {
  expiresIn: (process.env.JWT_ACCESS_EXPIRES || "15m") as jwt.SignOptions["expiresIn"],
};

  const refreshOptions: SignOptions = {
  expiresIn: (process.env.JWT_REFRESH_EXPIRES || "7d") as jwt.SignOptions["expiresIn"],
  };

  const accessToken = jwt.sign(payload, accessSecret, accessOptions);
  const refreshToken = jwt.sign({ _id: userId }, refreshSecret, refreshOptions);

  return { accessToken, refreshToken };
};
