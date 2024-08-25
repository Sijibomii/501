import express, { Request, Response } from "express";
import { authenticateAPIKey } from "../services/auth";
import { PositionUpdaterQueue } from "../jobs/positionUpdaterjob";

let positionRouter = express.Router();

// I removed auth middleware
positionRouter.post("", async (req: Request, res: Response) => {
  try {
    //check if bus is still within geofence

    await PositionUpdaterQueue.add(req.body, {
      attempts: 3,
      backoff: 3000,
      removeOnComplete: true,
    });

    return res.status(200).json({
      success: true,
      data: true,
      message: "Successfully updated position",
    });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ success: true, message: error.message });
  }
});

//fetch position of a bus since a particular date

export default positionRouter;
