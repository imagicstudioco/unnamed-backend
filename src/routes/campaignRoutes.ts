import { NextFunction, Request, Response, Router } from "express";
// controllers
import {
  createCampaignController,
  deleteCampaignController,
  getCampaignController,
  getCampaignsController,
  updateCampaignController,
} from "@/controllers/campaignController";
// middlewares
import auth from "@/middleware/auth";
import { uploadCampaignImageMedia } from "@/middleware/uploadFiles";

const campaignRoutes = Router();

// Public routes
campaignRoutes
  .get("/", getCampaignsController)
  .get("/:_id", getCampaignController);

// Protected routes
campaignRoutes.post(
  "/",
  [auth, uploadCampaignImageMedia.single("image")],
  createCampaignController
);
campaignRoutes.put("/:_id", auth, updateCampaignController);
campaignRoutes.delete("/:_id", auth, deleteCampaignController);

export default campaignRoutes;
