import { Types } from "mongoose";
import { IGenericResponse, RequireAtLeastOne } from ".";
// models
import { IMedia } from "@/models";
import { IUser } from "@/models/User";

export interface ICreateUserPayload {
  //   avatar: IMedia;
  //   email: string;
  //   name: string;
  nonce: string;
  walletAddress: string;
}

export interface TGetUser {
  _id?: Types.ObjectId;
  nonce?: string;
  walletAddress?: string;
}

export type IGetUserPayload = RequireAtLeastOne<
  TGetUser,
  "_id" | "nonce" | "walletAddress"
>;

export interface TUpdateUser {
  avatar?: IMedia;
  email?: string;
  name?: string;
  nonce?: string;
}

export type IUpdateUserPayload = RequireAtLeastOne<
  TUpdateUser,
  "avatar" | "email" | "name" | "nonce"
>;

export interface IUserResponse extends IGenericResponse<IUser> {}
