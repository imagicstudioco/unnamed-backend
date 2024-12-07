import { Router } from "express";
// controllers
import {
  createDonationControlller,
  getCampaignDonationsController,
  getUserDonationsController,
} from "@/controllers/donationController";
// middlewares
import auth from "@/middleware/auth";

const donationRoutes = Router();

donationRoutes
  .post("/", auth, createDonationControlller)
  .get("/campaign/:campaignId", getCampaignDonationsController)
  .get("/user", auth, getUserDonationsController);

export default donationRoutes;
