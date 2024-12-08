import { Schema } from "mongoose";

export const toObjectId = (id: string): Schema.Types.ObjectId => {
  return new Schema.Types.ObjectId(id);
};