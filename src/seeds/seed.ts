import mongoose, { Types } from "mongoose";
// models
import Campaign from "@/models/Campaign";
import User from "@/models/User";
// utils/models
import { ICreateCampaignPayload } from "@/utils/models/interfaces/campaign";

async function seedDatabase() {
  try {
    // Clear existing data
    // await Campaign.deleteMany({});
    // await User.deleteMany({});

    // Create a test user
    const user = await User.create({
      avatar: {
        path: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
        publicId: "seedTest",
      },
      email: "test@example.com",
      name: "Test User",
      nonce: Math.floor(Math.random() * 1000000).toString(),
      walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
    });

    // Create sample campaigns
    const campaigns: ICreateCampaignPayload[] = [
      {
        category: "medical",
        description: "Help provide essential medical care for those in need.",
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        goal: 50000,
        image: {
          path: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop",
          publicId: "testing-01",
        },
        raised: 15000,
        status: "active",
        title: "Medical Support Fund",
        userId: user._id as Types.ObjectId,
      },
      {
        category: "education",
        description:
          "Supporting underprivileged students with educational resources.",
        endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        goal: 25000,
        image: {
          path: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
          publicId: "testing-02",
        },
        raised: 8000,
        status: "completed",
        title: "Education for All",
        userId: user._id as Types.ObjectId,
      },
      {
        category: "environment",
        description: "Protecting local wildlife and natural habitats.",
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        goal: 35000,
        image: {
          path: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
          publicId: "testing-03",
        },
        raised: 12000,
        status: "cancelled",
        title: "Environmental Conservation",
        userId: user._id as Types.ObjectId,
      },
    ];

    await Campaign.insertMany(campaigns);
    console.log("Database seeded successfully");
  } catch (error) {
    console.warn("Error seeding database:", error);
  }
}

export default seedDatabase;
