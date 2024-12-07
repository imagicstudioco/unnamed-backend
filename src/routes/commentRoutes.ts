import { Router } from "express";
// controllers
import {
  createCommentController,
  deleteCommentController,
  getCommentController,
} from "@/controllers/commentControllet";
// middlewares
import auth from "@/middleware/auth";

const commentRoutes = Router();

commentRoutes
  .post("/", auth, createCommentController)
  .get("/campaign/:campaignId", getCommentController)
  .delete("/:id", auth, deleteCommentController);

export default commentRoutes;
