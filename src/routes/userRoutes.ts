import { Router } from "express";
// controllers
import {
  getNonceController,
  getProfileController,
  updateProfileController,
  verifyWalletController,
} from "@/controllers/userController";
// middlewares
import auth from "@/middleware/auth";
import { uploadUserAvatarMedia } from "@/middleware/uploadFiles";

const userRoutes = Router();

// Public routes
userRoutes
  .get("/nonce/:walletAddress", getNonceController)
  .post("/verify", verifyWalletController)
  .get("/profile", auth, getProfileController)
  .put(
    "/profile",
    [
      // auth,
      uploadUserAvatarMedia.single("avatar"),
    ],
    updateProfileController
  );

export default userRoutes;
