import { NextFunction, Request, Response } from "express";
// models
import Campaign from "@/models/Campaign";
import Donation from "@/models/Donation";
// utils/config
import { checkForObjectKeys } from "@/utils/config/check";
// utils/errors
import { RequestBodyError } from "@/utils/errors";
// utils/models
import { createDonation } from "@/utils/models/donation";

export const createDonationControlller = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { amount, campaignId, message, transactionHash } = req.body;

    const errorMessage = checkForObjectKeys(
      ["amount", "campaignId", "message", "transactionHash"],
      req.body
    );

    if (errorMessage) {
      throw new RequestBodyError(errorMessage);
    }

    const { _id: userId } = req.user;

    const donation = new Donation({
      amount,
      campaignId,
      message,
      transactionHash,
      userId,
    });

    await donation.save();

    // Update campaign raised amount
    await Campaign.findByIdAndUpdate(campaignId, {
      $inc: { raised: amount },
    });

    await donation.populate("userId", "name avatar");

    return res.status(201).json({ data: donation, error: "", success: true });
  } catch (error) {
    next(error);
  }
};

export const getCampaignDonationsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { campaignId } = req.params;

    const data = await Donation.find({ campaignId })
      .populate("userId", "name avatar")
      .sort("-createdAt");

    return res.status(200).json({ data, error: "", success: true });
  } catch (error) {
    next(error);
  }
};

export const getUserDonationsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const data = await Donation.find({ userId: req.user._id })
      .populate("campaignId", "title image")
      .sort("-createdAt");

    return res.status(200).json({ data, error: "", success: true });
  } catch (error) {
    next(error);
  }
};
