import { Schema } from "mongoose";
import { IGenericResponse, RequireAtLeastOne } from ".";
// models
import { IMedia } from "@/models";
import { ICampaign } from "@/models/Campaign";

export interface ICreateCampaignPayload {
  category: string;
  description: string;
  endDate: Date;
  goal: number;
  image: IMedia;
  status: string;
  raised: number;
  title: string;
  userId: Schema.Types.ObjectId;
}

export interface IGetCampaignPayload {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
}

export interface TUpdateCampaign {
  category: string;
  description: string;
  endDate: Date;
  goal: number;
  image: IMedia;
  status: string;
  raised: number;
  title: string;
}

export type IUpdateCampaignPayload = RequireAtLeastOne<
  TUpdateCampaign,
  | "category"
  | "description"
  | "endDate"
  | "goal"
  | "image"
  | "raised"
  | "status"
  | "title"
>;

export interface ICampaignResponse extends IGenericResponse<ICampaign> {}

export interface ICampaignsResponse extends IGenericResponse<ICampaign[]> {}
