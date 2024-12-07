import { Schema } from "mongoose";
import { IGenericResponse } from ".";
// models
import { IDonation } from "@/models/Donation";

export interface ICreateDonationPayload {
  amount: number;
  campaignId: Schema.Types.ObjectId;
  message: string;
  transactionHash: string;
  userId: Schema.Types.ObjectId;
}

export interface IDonationResponse extends IGenericResponse<IDonation> {}
