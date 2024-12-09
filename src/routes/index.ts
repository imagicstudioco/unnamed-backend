import { Request, Response, Router } from "express";
// controllers
import { isAliveController } from "@/controllers";

export const baseAPIURL = "/api";

export const indexRoutes = Router();

indexRoutes
  .get("/health", isAliveController)
  .get(`${baseAPIURL}/health`, isAliveController)
  .get(baseAPIURL, (req: Request, res: Response) => {
    res.send('<h1>OnchainRaiser Backend</h1> <p>Welcome to the onchainraiser backend</p> <p>OnchainRaiser is an onchain crowd funding platform, designed to enable and empower those in need to get access to necessary funding</p>');
  });
