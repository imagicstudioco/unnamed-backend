import { NextFunction, Request, Response } from "express";
import { Schema } from "mongoose";
// config
import cloudinary from "@/config/cloudinary";
// models
import Campaign from "@/models/Campaign";
// utils/config
import { checkForObjectKeys } from "@/utils/config/check";
// utils/errors
import {
  CampaignError,
  FileUploadError,
  RequestBodyError,
} from "@/utils/errors";
// utils/models
import { IUpdateCampaignPayload } from "@/utils/models/interfaces/campaign";
import {
  createCampaign,
  deleteCampaign,
  getCampaign,
  updateCampaign,
} from "@/utils/models/campaign";
import { toObjectId } from "@/utils/config/mongoose";

const ObjectId = Schema.ObjectId;

export const createCampaignController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { category, description, endDate, goal, status, raised, title } =
      req.body;

    const errorMessage = checkForObjectKeys(
      [
        "category",
        "description",
        "endDate",
        "goal",
        "status",
        "raised",
        "title",
        "user",
      ],
      req.body
    );

    if (errorMessage) {
      throw new RequestBodyError(errorMessage);
    }

    if (!req.file) {
      throw new FileUploadError("Missing `image` field with uploaded image");
    }

    const { _id: userId } = req.user;

    const { filename: publicId, path } = req.file;

    const { data, error, success } = await createCampaign({
      category,
      description,
      endDate,
      goal,
      image: { path, publicId },
      status,
      raised,
      title,
      userId: toObjectId(userId),
    });

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

export const getCampaignsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { category, search, sort = "-createdAt" } = req.query;

    const query: any = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const data = await Campaign.find(query)
      .sort(String(sort))
      .populate("user", "name avatar")
      .populate("donorsCount");

    return res.status(200).json({ data, error: "", success: true });
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

export const getCampaignController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;

    const data = await Campaign.findById(id)
      .populate("user", "name avatar")
      .populate("donorsCount");

    if (!data) {
      throw new CampaignError(
        `Campaign with payload ${JSON.stringify({ id })} does not exist!`
      );
    }

    return res.status(200).json({ data, error: "", success: true });
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

export const updateCampaignController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { _id } = req.params;

    const { category, description, endDate, goal, status, raised, title } =
      req.body;

    // consider req.file for file upload
    if (
      !category &&
      !description &&
      !endDate &&
      !goal &&
      !status &&
      !raised &&
      !title &&
      !req.file
    ) {
      throw new RequestBodyError(
        "Update requires one of `category` or `description` or `endDate` or `goal` or `status` or `raised` or `title` or image file uploaded in field `image`"
      );
    }

    let updatePayload: null | IUpdateCampaignPayload = null;

    if (category) {
      updatePayload = { category };
    }
    if (description) {
      updatePayload = { ...updatePayload, description };
    }
    if (endDate) {
      updatePayload = { ...updatePayload, endDate };
    }
    if (goal) {
      updatePayload = { ...updatePayload, goal };
    }
    if (status) {
      updatePayload = { ...updatePayload, status };
    }
    if (raised) {
      updatePayload = { ...updatePayload, raised };
    }
    if (title) {
      updatePayload = { ...updatePayload, title };
    }
    if (req.file) {
      const { filename: publicId, path } = req.file;
      updatePayload = { ...updatePayload, image: { path, publicId } };
    }

    const { _id: userId } = req.user;

    let data, error, success;

    if (updatePayload) {
      ({ data, error, success } = await updateCampaign(
        { _id: toObjectId(_id), userId: toObjectId(userId) },
        updatePayload
      ));
    }

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

export const deleteCampaignController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { _id } = req.params;
    const { _id: userId } = req.user;

    const { data, error, success } = await deleteCampaign({
      _id: toObjectId(_id),
      userId: toObjectId(userId),
    });

    if (!success) {
      throw error;
    }

    return res.status(201).json({ data, error, success });
  } catch (error) {
    next(error);
  }
};
