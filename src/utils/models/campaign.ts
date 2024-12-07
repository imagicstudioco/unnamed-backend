import { Schema } from "mongoose";
// errors
import { CampaignError } from "@/utils/errors";
// interfaces
import { IIDPayload } from "./interfaces";
import {
  ICampaignResponse,
  ICreateCampaignPayload,
  IGetCampaignPayload,
  IUpdateCampaignPayload,
} from "./interfaces/campaign";
// models
import Campaign from "@/models/Campaign";

const ObjectId = Schema.ObjectId;

export const createCampaign = async (
  payload: ICreateCampaignPayload
): Promise<ICampaignResponse> => {
  let response: ICampaignResponse = {
    data: {
      _id: new ObjectId(""),
      category: "",
      description: "",
      endDate: new Date(),
      goal: 0,
      image: {
        path: "",
        publicId: "",
      },
      status: "",
      raised: 0,
      title: "",
      userId: new ObjectId(""),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await Campaign.create(payload);

    if (!result) {
      throw new CampaignError("Campaign creation failed!");
    }

    const {
      _id,
      category,
      description,
      endDate,
      goal,
      image,
      status,
      raised,
      title,
      userId,
      createdAt,
      updatedAt,
    } = result;

    response = {
      data: {
        _id,
        category,
        description,
        endDate,
        goal,
        image,
        status,
        raised,
        title,
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

export const getCampaign = async (
  payload: IIDPayload
): Promise<ICampaignResponse> => {
  let response: ICampaignResponse = {
    data: {
      _id: new ObjectId(""),
      category: "",
      description: "",
      endDate: new Date(),
      goal: 0,
      image: {
        path: "",
        publicId: "",
      },
      status: "",
      raised: 0,
      title: "",
      userId: new ObjectId(""),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await Campaign.findById(payload._id);

    if (!result) {
      throw new CampaignError(
        `Campaign with payload ${JSON.stringify(payload)} does not exist!`
      );
    }

    const {
      _id,
      category,
      description,
      endDate,
      goal,
      image,
      status,
      raised,
      title,
      userId,
      createdAt,
      updatedAt,
    } = result;

    response = {
      data: {
        _id,
        category,
        description,
        endDate,
        goal,
        image,
        status,
        raised,
        title,
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

export const updateCampaign = async (
  payload: IGetCampaignPayload,
  updatePayload: IUpdateCampaignPayload
): Promise<ICampaignResponse> => {
  let response: ICampaignResponse = {
    data: {
      _id: new ObjectId(""),
      category: "",
      description: "",
      endDate: new Date(),
      goal: 0,
      image: {
        path: "",
        publicId: "",
      },
      status: "",
      raised: 0,
      title: "",
      userId: new ObjectId(""),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await Campaign.findOneAndUpdate(
      payload,
      {
        ...updatePayload,
      },
      { new: true }
    );

    if (!result) {
      throw new CampaignError(
        `Campaign with payload ${JSON.stringify(payload)} update failed!`
      );
    }

    const {
      _id,
      category,
      description,
      endDate,
      goal,
      image,
      status,
      raised,
      title,
      userId,
      createdAt,
      updatedAt,
    } = result;

    response = {
      data: {
        _id,
        category,
        description,
        endDate,
        goal,
        image,
        status,
        raised,
        title,
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

export const deleteCampaign = async (
  payload: IGetCampaignPayload
): Promise<ICampaignResponse> => {
  let response: ICampaignResponse = {
    data: {
      _id: new ObjectId(""),
      category: "",
      description: "",
      endDate: new Date(),
      goal: 0,
      image: {
        path: "",
        publicId: "",
      },
      status: "",
      raised: 0,
      title: "",
      userId: new ObjectId(""),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await Campaign.findOneAndRemove(payload);

    if (!result) {
      throw new CampaignError(
        `Campaign with payload ${JSON.stringify(payload)} deletion failed!`
      );
    }

    const {
      _id,
      category,
      description,
      endDate,
      goal,
      image,
      status,
      raised,
      title,
      userId,
      createdAt,
      updatedAt,
    } = result;

    response = {
      data: {
        _id,
        category,
        description,
        endDate,
        goal,
        image,
        status,
        raised,
        title,
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
