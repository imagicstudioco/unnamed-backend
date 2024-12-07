import { Model, Schema } from "mongoose";

export interface IMedia {
  path: string;
  publicId: string;
}

interface IMediaSchema extends Model<IMedia>, IMedia {}

export const mediaSchema = new Schema<IMediaSchema>(
  {
    path: {
      required: [true, "`path` field is required"],
      type: String,
    },
    publicId: {
      required: [true, "`publicId` field is required"],
      type: String,
      unique: true,
    },
  },
  { _id: false }
);
