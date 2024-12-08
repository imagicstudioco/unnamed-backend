import crypto from "crypto";
import { ethers } from "ethers";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
// config
import cloudinary from "@/config/cloudinary";
// models
import User from "@/models/User";
// utils/config
import { checkForObjectKeys } from "@/utils/config/check";
// utils/errors
import { RequestBodyError } from "@/utils/errors";
// utils/models
import { createUser, getUser, updateUser } from "@/utils/models/user";
import { IUpdateUserPayload } from "@/utils/models/interfaces/user";
import { toObjectId } from "@/utils/config/mongoose";

const { JWT_SECRET } = process.env;

// Generate nonce for wallet signature
const generateNonce = () => {
  return crypto.randomBytes(32).toString("hex");
};

// Verify wallet signature
const verifySignature = (
  message: string,
  signature: string,
  walletAddress: string
) => {
  try {
    const recoveredAddress = ethers.verifyMessage(message, signature);
    return recoveredAddress.toLowerCase() === walletAddress.toLowerCase();
  } catch (error) {
    return false;
  }
};

export const getNonceController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { walletAddress } = req.params;

    let { data, error, success } = await getUser({
      walletAddress: walletAddress.toLowerCase(),
    });

    if (!success) {
      // Create new user if doesn't exist
      ({ data, error, success } = await createUser({
        nonce: generateNonce(),
        walletAddress: walletAddress.toLowerCase(),
      }));

      if (!success) {
        throw error;
      }
    } else {
      // Update nonce for existing user
      ({ data, error, success } = await updateUser(
        { _id: data._id! },
        { nonce: generateNonce() }
      ));

      if (!success) {
        throw error;
      }
    }

    return res.status(200).json({ data, error, success });
  } catch (error) {
    next(error);
  }
};

export const verifyWalletController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { walletAddress, signature } = req.body;

    let { data, error, success } = await getUser({
      walletAddress: walletAddress.toLowerCase(),
    });

    if (!success) {
      throw error;
    }

    const message = `Sign this message to verify your wallet. Nonce: ${data.nonce}`;

    const isValid = verifySignature(message, signature, walletAddress);

    if (!isValid) {
      throw new Error("Invalid signature");
    }

    // Generate new nonce for next login
    ({ data, error, success } = await updateUser(
      { _id: data._id! },
      { nonce: generateNonce() }
    ));

    if (!success) {
      throw error;
    }

    const token = jwt.sign({ userId: data._id }, JWT_SECRET!, {
      expiresIn: "24h",
    });

    return res.status(201).json({
      data: {
        token,
        user: {
          ...data,
        },
      },
      error: "",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const getProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { data, error, success } = await getUser({ _id: toObjectId(req.user._id) });

    if (!success) {
      throw error;
    }

    return res.status(200).json({ data, error, success });
  } catch (error) {
    next(error);
  }
};

export const updateProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { name } = req.body;

    if (!name && !req.file) {
      throw new RequestBodyError(
        "Update requires one of the following fields: `name` or `image` for uploaded image file"
      );
    }

    let updatePayload: IUpdateUserPayload | undefined = undefined;

    if (name) {
      updatePayload = { name };
    }
    if (req.file) {
      const { filename: publicId, path } = req.file;

      updatePayload = { ...updatePayload, avatar: { path, publicId } };
    }

    const { data, error, success } = await updateUser(
      { _id: toObjectId(req.user._id) },
      updatePayload!
    );

    if (!success) {
      throw error;
    }

    return res.status(201).json({ data, error, success });
  } catch (error) {
    if (req.file) {
      const { filename } = req.file;

      await cloudinary.api.delete_resources([filename]);
    }
    next(error);
  }
};
