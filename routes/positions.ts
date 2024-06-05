import express, { Request, Response } from "express";
import { authenticateAPIKey } from "../services/auth";
import { PositionUpdaterQueue } from "../jobs/positionUpdaterjob";

let positionRouter = express.Router();

positionRouter.post(
  "",
  authenticateAPIKey,
  async (req: Request, res: Response) => {
    try {
      //check if bus is still within geofence
      await PositionUpdaterQueue.add(req.body, {
        attempts: 3,
        backoff: 3000,
        removeOnComplete: true,
      });
    } catch (error) {}
  }
);
