import { Model, model, Schema } from "mongoose";
// .
import Campaign from "./Campaign";
// errors
import { CampaignError } from "@/utils/errors";

const ObjectId = Schema.ObjectId;

export interface IDonation {
  amount: number;
  campaignId: Schema.Types.ObjectId;
  message: string;
  transactionHash: string;
  userId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

interface IDonationSchema extends Model<IDonation>, IDonation {}

const donationSchema = new Schema<IDonationSchema>(
  {
    amount: {
      min: 0,
      required: [true, "`amount` field is required"],
      type: Number,
    },
    campaignId: {
      ref: "Campaign",
      required: [true, "`campaign` field is required"],
      type: ObjectId,
      validate: {
        validator: async (campaignId: typeof ObjectId): Promise<boolean> => {
          const campaignExists = await Campaign.findById(campaignId);

          if (!campaignExists) {
            throw new CampaignError(
              `Campaign with payload ${JSON.stringify({
                campaignId,
              })} does not exist!`
            );
          }

          return true;
        },
      },
    },
    message: {
      trim: true,
      type: String,
    },
    transactionHash: {
      required: [true, "`transactionHash` field is required"],
      type: String,
      unique: true,
    },
    userId: {
      ref: "User",
      required: [true, "`user` field is required"],
      type: ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Donation", donationSchema);
