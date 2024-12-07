import { Schema } from "mongoose";
// errors
import { UserError } from "../errors";
// interfaces
import {
  ICreateUserPayload,
  IGetUserPayload,
  IUpdateUserPayload,
  IUserResponse,
} from "./interfaces/user";
// models
import User from "@/models/User";

const ObjectId = Schema.ObjectId;

export const createUser = async (
  payload: ICreateUserPayload
): Promise<IUserResponse> => {
  let response: IUserResponse = {
    data: {
      // avatar: "",
      email: "",
      name: "",
      nonce: "",
      walletAddress: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await User.create(payload);

    if (!result) {
      throw new UserError("User creation failed!");
    }

    const {
      _id,
      avatar,
      email,
      name,
      nonce,
      walletAddress,
      createdAt,
      updatedAt,
    } = result;

    response = {
      data: {
        _id,
        avatar,
        email,
        name,
        nonce,
        walletAddress,
        createdAt,
        updatedAt,
      },
      error: "",
      success: true,
    };
  } catch (error) {
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};

export const getUser = async (
  payload: IGetUserPayload
): Promise<IUserResponse> => {
  let response: IUserResponse = {
    data: {
      // avatar: "",
      email: "",
      name: "",
      nonce: "",
      walletAddress: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await User.findOne(payload);

    if (!result) {
      throw new UserError(
        `User with payload ${JSON.stringify(payload)} does not exist!`
      );
    }

    const {
      _id,
      avatar,
      email,
      name,
      nonce,
      walletAddress,
      createdAt,
      updatedAt,
    } = result;

    response = {
      data: {
        _id,
        avatar,
        email,
        name,
        nonce,
        walletAddress,
        createdAt,
        updatedAt,
      },
      error: "",
      success: true,
    };
  } catch (error) {
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};

export const updateUser = async (
  payload: IGetUserPayload,
  updatePayload: IUpdateUserPayload
): Promise<IUserResponse> => {
  let response: IUserResponse = {
    data: {
      // avatar: "",
      email: "",
      name: "",
      nonce: "",
      walletAddress: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await User.findOneAndUpdate(payload, updatePayload, {
      new: true,
    });

    if (!result) {
      throw new UserError(
        `User with payload ${JSON.stringify(payload)} does not exist!`
      );
    }

    const {
      _id,
      avatar,
      email,
      name,
      nonce,
      walletAddress,
      createdAt,
      updatedAt,
    } = result;

    response = {
      data: {
        _id,
        avatar,
        email,
        name,
        nonce,
        walletAddress,
        createdAt,
        updatedAt,
      },
      error: "",
      success: true,
    };
  } catch (error) {
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};
