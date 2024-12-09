import { Model, model, Schema } from "mongoose";
// .
import { IMedia, mediaSchema } from ".";

export interface ICampaign {
  _id?: Schema.Types.ObjectId;
  category: string;
  description: string;
  endDate: Date;
  goal: number;
  image: IMedia;
  status: string;
  raised: number;
  title: string;
  userId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

interface ICampaignSchema extends Model<ICampaign>, ICampaign {}

const campaignSchema = new Schema<ICampaignSchema>(
  {
    category: {
      enum: [
        "medical",
        "education",
        "emergency",
        "nonprofit",
        "animals",
        "sports",
        "environment",
        "community",
      ],
      required: [true, "`category` field is required"],
      type: String,
    },
    description: {
      required: [true, "`description` field is required"],
      type: String,
    },
    endDate: {
      required: [true, "`endDate` field is required"],
      type: Date,
    },
    goal: {
      min: 0,
      required: [true, "`goal` field is required"],
      type: Number,
    },
    image: {
      required: [true, "`image` field is required"],
      type: mediaSchema,
    },
    status: {
      default: "active",
      enum: ["active", "completed", "cancelled"],
      required: [true, "`status` field is required"],
      type: String,
    },
    raised: {
      default: 0,
      required: [true, "`raised` field is required"],
      type: Number,
    },
    title: {
      required: [true, "`title` field is required"],
      trim: true,
      type: String,
    },
    userId: {
      ref: "User",
      required: [true, "`user` field is required"],
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    virtuals: {
      daysLeft: {
        get(this: ICampaignSchema): number {
          return Math.ceil(
            (Number(new Date(this.endDate)) - Date.now()) /
              (1000 * 60 * 60 * 24)
          );
        },
      },
      donorsCount: {
        options: {
          count: true,
          foreignField: "campaign",
          localField: "_id",
          ref: "Donation",
        },
      },
    },
  }
);

/*
// Virtual for donors count
campaignSchema.virtual("donorsCount", {
  ref: "Donation",
  localField: "_id",
  foreignField: "campaign",
  count: true,
});

// Virtual for days left
campaignSchema.virtual("daysLeft").get(function () {
  return Math.ceil(
    (Number(new Date(this.endDate)) - Date.now()) / (1000 * 60 * 60 * 24)
  );
});
*/

export default model("Campaign", campaignSchema);
