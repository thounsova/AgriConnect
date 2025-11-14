import jwt, { SignOptions } from "jsonwebtoken";

const accessSecret = process.env.JWT_ACCESS_SECRET as string;
const refreshSecret = process.env.JWT_REFRESH_SECRET as string;

// Function to generate access and refresh tokens with multiple roles
export const generateTokens = (
  userId: string,
  email: string,
  roles: string[] // ✅ accept array
) => {
  const payload = { _id: userId, email, roles }; //  store array in JWT

  const accessOptions: SignOptions = {
    expiresIn: (process.env.JWT_ACCESS_EXPIRES || "15m") as jwt.SignOptions["expiresIn"],
  };

  const refreshOptions: SignOptions = {
    expiresIn: (process.env.JWT_REFRESH_EXPIRES || "7d") as jwt.SignOptions["expiresIn"],
  };

  // Generate tokens
  const accessToken = jwt.sign(payload, accessSecret, accessOptions);
  const refreshToken = jwt.sign({ _id: userId }, refreshSecret, refreshOptions);

  return { accessToken, refreshToken };
};
