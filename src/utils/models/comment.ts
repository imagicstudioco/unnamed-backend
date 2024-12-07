import { Schema } from "mongoose";
// errors
import { CommentError } from "../errors";
// interfaces
import { IIDPayload } from "./interfaces";
import {
  ICommentResponse,
  ICreateCommentPayload,
  IGetCommentPayload,
} from "./interfaces/comment";
// models
import Comment from "@/models/Comment";

const ObjectId = Schema.ObjectId;

export const createComment = async (
  payload: ICreateCommentPayload
): Promise<ICommentResponse> => {
  let response: ICommentResponse = {
    data: {
      campaignId: new ObjectId(""),
      content: "",
      userId: new ObjectId(""),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await Comment.create(payload);

    if (!result) {
      throw new CommentError("Comment creation failed!");
    }

    const { _id, campaignId, content, userId, createdAt, updatedAt } = result;

    response = {
      data: { _id, campaignId, content, userId, createdAt, updatedAt },
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

export const getComment = async ({
  _id: campaignId,
}: IIDPayload): Promise<ICommentResponse> => {
  let response: ICommentResponse = {
    data: {
      campaignId: new ObjectId(""),
      content: "",
      userId: new ObjectId(""),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await Comment.findOne({ campaignId });

    if (!result) {
      throw new CommentError(
        `Comment with payload ${JSON.stringify({ campaignId })} does not exist!`
      );
    }

    const { _id, content, userId, createdAt, updatedAt } = result;

    response = {
      data: { _id, campaignId, content, userId, createdAt, updatedAt },
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

export const deleteComment = async (
  payload: IGetCommentPayload
): Promise<ICommentResponse> => {
  let response: ICommentResponse = {
    data: {
      campaignId: new ObjectId(""),
      content: "",
      userId: new ObjectId(""),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await Comment.findOneAndRemove(payload);

    if (!result) {
      throw new CommentError(
        `Comment with payload ${JSON.stringify(payload)} deletion failed!`
      );
    }

    const { _id, campaignId, content, userId, createdAt, updatedAt } = result;

    response = {
      data: { _id, campaignId, content, userId, createdAt, updatedAt },
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
