import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
// config
import { JWT_SECRET } from "@/config";
// utils/errors
import { AuthError } from "@/utils/errors";
// utils/models
import { getUser } from "@/utils/models/user";
import { IUser } from "@/models/User";

// Add type declaration for req.user
declare global {
  namespace Express {
    interface Request {
      user: {
        _id: string;
        walletAddress: string;
        name?: string;
        email?: string;
        avatar?: {
          path: string;
          publicId: string;
        };
      };
    }
  }
}

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new AuthError("No token found!");
    }

    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

    const { data, error, success } = await getUser({
      _id: new Types.ObjectId(decoded.userId),
    });

    if (!success) {
      throw error;
    }

    // Ensure data exists and has required fields before setting req.user
    if (!data || !data._id || !data.walletAddress) {
      throw new AuthError("Invalid user data");
    }

    // Convert ObjectId to string and construct user object
    req.user = {
      _id: data._id.toString(),
      walletAddress: data.walletAddress,
      name: data.name,
      email: data.email,
      avatar: data.avatar,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
