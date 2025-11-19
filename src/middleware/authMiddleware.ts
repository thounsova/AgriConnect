import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { handleError } from "@/utils/response-util";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        email: string;
        roles: string[];
      };
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET!;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return handleError(res, 401, "Unauthorized: No token provided");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Accept either _id or userId for legacy tokens
    req.user = {
      _id: (decoded._id || decoded.userId) as string,
      email: decoded.email as string,
      roles: decoded.roles as string[],
    };

    if (!req.user._id || !req.user.email || !req.user.roles) {
      return handleError(res, 400, "Invalid token payload");
    }

    next();
  } catch (err: any) {
    console.error("Auth error:", err);
    if (err instanceof jwt.TokenExpiredError) return handleError(res, 401, "Token expired");
    if (err instanceof jwt.JsonWebTokenError) return handleError(res, 401, "Invalid token");
    return handleError(res, 500, "Internal server error");
  }
};

export const checkRoleMiddleware = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return handleError(res, 401, "Unauthorized");

    const hasRole = req.user.roles.some(role => allowedRoles.includes(role));
    if (!hasRole) return handleError(res, 403, "Access forbidden");

    next();
  };
};
