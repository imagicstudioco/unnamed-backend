import { Types } from "mongoose";
import { IGenericResponse } from ".";
// models
import { IComment } from "@/models/Comment";

export interface ICreateCommentPayload {
  campaignId: Types.ObjectId;
  content: string;
  userId: Types.ObjectId;
}

export interface IGetCommentPayload {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
}

export interface ICommentResponse extends IGenericResponse<IComment> {}

export interface ICommentsResponse extends IGenericResponse<IComment> {}
