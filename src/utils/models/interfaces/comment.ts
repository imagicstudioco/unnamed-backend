import { Schema } from "mongoose";
import { IGenericResponse } from ".";
// models
import { IComment } from "@/models/Comment";

export interface ICreateCommentPayload {
  campaignId: Schema.Types.ObjectId;
  content: string;
  userId: Schema.Types.ObjectId;
}

export interface IGetCommentPayload {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
}

export interface ICommentResponse extends IGenericResponse<IComment> {}

export interface ICommentsResponse extends IGenericResponse<IComment> {}
