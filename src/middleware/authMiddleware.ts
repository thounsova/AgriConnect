import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthUser } from "@/types/auth-type";
import { handleError } from "@/utils/response-util";

declare global {
  // Extend Express Request interface to include user property
    namespace Express {
        interface Request {
            user?: AuthUser;
        }
    }
}
// Middleware to authenticate and authorize users
export const authMiddleware = (req : Request, res : Response, next : NextFunction): void | Response => {
 try {
  const authheader = req.headers.authorization;
  if (!authheader || !authheader.startsWith("Bearer ")) {
    return handleError(res, 401, "Unauthorized: No token provided");

  }
  // check token
  const token = authheader?.split("")[1];
  const secretKey = process.env.JWT_ACCESS_SECRET as string;
  if (!secretKey) {
    return handleError(res, 401, "Unauthorized: No token provided");
  }

  // Verify token
  const decoded = jwt.verify(token, secretKey) as JwtPayload;
  // Validate decoded token
   if (!decoded?._id || !decoded?.email || !decoded?.role) {
      return handleError(res, 400, "Invalid token");
    }
   //request user save info
   req.user = {
      _id: decoded._id,
      email: decoded.email,
      role: decoded.role,
   };
    // Proceed to next middleware or route handler
    next();


}
catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return handleError(res, 401, "Unauthorized: Invalid token");
    }
    console.error("Authentication error:", error);
    return handleError(res, 500, "Internal server error");
  }
};

export const checkRoleMiddleware = (...allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // check if user is authenticated
      if (!req.user) {
        return handleError(res, 401, "Unauthorized.");
      }

      // check if user has one of the allowed roles
      if (!allowedRoles.includes(req.user.role)) {
        return handleError(res, 403, "Access forbidden.");
      }

      // Proceed to next middleware or route handler
      next();
    } catch (error) {
      console.error(error);
      return handleError(res, 500, "Unexpected error occurred");
    }
  };
};

