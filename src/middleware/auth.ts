import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Schema } from "mongoose";
// utils/models
import { getUser } from "@/utils/models/user";

const { JWT_SECRET } = process.env;

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error("Authentication token missing");
    }

    const decoded = jwt.verify(token, JWT_SECRET!) as CustomJwtPayload;

    const { data, error, success } = await getUser({ 
      _id: new Schema.Types.ObjectId(decoded.userId) 
    });

    if (!success) {
      throw error;
    }

    req.user = {
      _id: data._id!.toString(),
      walletAddress: data.walletAddress,
      name: data.name,
      email: data.email,
      avatar: data.avatar
    };
    
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
