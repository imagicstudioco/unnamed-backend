import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
// models
import User from "@/models/User";
// utils/models
import { getUser } from "@/utils/models/user";

const { JWT_SECRET } = process.env;

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded: any = jwt.verify(token, JWT_SECRET!);

    const { data, error, success } = await getUser({ _id: decoded.userId });

    if (!success) {
      throw error;
    }

    req.user = data;
    next();
  } catch (error) {
    // res.status(401).json({ message: 'Please authenticate' });
    next(error);
  }
};

export default auth;
