import { Model, model, Schema } from "mongoose";
// .
import { IMedia, mediaSchema } from ".";
// utils/errors
import { UserError } from "@/utils/errors";

export interface IUser {
  _id?: Schema.Types.ObjectId;
  avatar?: IMedia;
  email: string;
  name: string;
  nonce: string;
  walletAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IUserSchema extends Model<IUser>, IUser {}

const userSchema = new Schema<IUserSchema>({
  avatar: {
    // required: [true, "`avatar` field is required"],
    type: mediaSchema,
  },
  email: {
    // required: [true, "`email` field is required"],
    trim: true,
    type: String,
    unique: true,
  },
  name: {
    // required: [true, "`name` field is required"],
    trim: true,
    type: String,
  },
  nonce: {
    default: () => Math.floor(Math.random() * 1000000).toString(),
    type: String,
    required: [true, "`nonce` field is required"],
  },
  walletAddress: {
    required: [true, "`walletAddress` field is required"],
    type: String,
    unique: true,
    validate: {
      validator: (walletAddress: string) => {
        const regex = /^(0x)?[0-9a-fA-F]{40}$/;

        if (!regex.test(walletAddress)) {
          throw new UserError("Pass a valid wallet address!");
        }
      },
    },
  },
});

export default model("User", userSchema);
