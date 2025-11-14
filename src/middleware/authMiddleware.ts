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

// Auth middleware
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return handleError(res, 401, "Unauthorized: No token provided");
    }

    const token = authHeader.split(" ")[1];
    const secretKey = process.env.JWT_ACCESS_SECRET!;
    const decoded = jwt.verify(token, secretKey) as JwtPayload;

    if (!decoded?._id || !decoded?.email || !decoded?.roles) {
      return handleError(res, 400, "Invalid token");
    }

    req.user = {
      _id: decoded._id as string,
      email: decoded.email as string,
      roles: decoded.roles as string[],
    };

    next();
  } catch (error: any) {
    if (error instanceof jwt.JsonWebTokenError) {
      return handleError(res, 401, "Unauthorized: Invalid token");
    }
    console.error("Authentication error:", error);
    return handleError(res, 500, "Internal server error");
  }
};

// Role middleware
export const checkRoleMiddleware = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return handleError(res, 401, "Unauthorized.");

    const hasRole = req.user.roles.some(role => allowedRoles.includes(role));
    if (!hasRole) return handleError(res, 403, "Access forbidden.");

    next();
  };
};
