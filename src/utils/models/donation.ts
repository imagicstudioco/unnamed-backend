import { Schema } from "mongoose";
// errors
import { DonationError } from "../errors";
// interfaces
import {
  ICreateDonationPayload,
  IDonationResponse,
} from "./interfaces/donation";
// models
import Donation from "@/models/Donation";

const ObjectId = Schema.ObjectId;

export const createDonation = async (
  payload: ICreateDonationPayload
): Promise<IDonationResponse> => {
  let response: IDonationResponse = {
    data: {
      amount: 0,
      campaignId: new ObjectId(""),
      message: "",
      transactionHash: "",
      userId: new ObjectId(""),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await Donation.create(payload);

    if (!result) {
      throw new DonationError("Donation creation failed!");
    }

    const {
      amount,
      campaignId,
      message,
      transactionHash,
      userId,
      createdAt,
      updatedAt,
    } = result;

    response = {
      data: {
        amount,
        campaignId,
        message,
        transactionHash,
        userId,
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
