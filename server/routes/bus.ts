import express, { Request, Response } from "express";
import { authenticateAPIKey } from "../services/auth";
import { PositionUpdaterQueue } from "../jobs/positionUpdaterjob";
import bus from "../services/bus";
import { DEFAULT_GEOFENCING_BOUNDARY_COORDINATES } from "../config";
import { tryCatch } from "bullmq";
import terminal from "../services/terminal";
import geoservice from "../services/geoservice";

let busRouter = express.Router();

busRouter.post("", authenticateAPIKey, async (req: Request, res: Response) => {
  try {
    //check if bus is still within geofence
    const { plateNumber, boundaryCoodinates } = req.body;
 
    const data = await bus.create(
      plateNumber,
      boundaryCoodinates || DEFAULT_GEOFENCING_BOUNDARY_COORDINATES
    );

    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

busRouter.get("", async (req: Request, res: Response) => {
  try {
    //check if bus is still within geofence
    const data = await bus.getAll();
    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

busRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    //check if bus is still within geofence
    const id = req.params.id;
    const data = await bus.getById(id);
    var lastTerminal, nextTerminal;
    if (data?.lastTerminal) {
      lastTerminal = await terminal.getById(data?.lastTerminal);
    }
    if (data?.nextTerminal) {
      nextTerminal = await terminal.getById(data.nextTerminal);
    }
    console.log(data);
    return res.status(200).json({
      success: true,
      data: { ...data, lastTerminal, nextTerminal },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

busRouter.get("/distance/:id", async (req: Request, res: Response) => {
  try {
    //check if bus is still within geofence
    const id = req.params.id;
    const latitude = Number(req.query.latitude);
    const longitude = Number(req.query.longitude);
    const data = await bus.getById(id);
    const routeInfo = await geoservice.getRouteBetweenPoints(
      [data!.currentPosition, { latitude, longitude }],
      "driving"
    );
    return res.status(200).json({
      success: true,
      data: {
        distance: routeInfo.routes[0].distance,
        duration: routeInfo.routes[0].duration,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

busRouter.post(
  "/newTrip",
  authenticateAPIKey,
  async (req: Request, res: Response) => {
    try {
      const { busId, tripId } = req.body;
      const data = await bus.initiateNewTrip(busId, tripId);
      return res.status(200).json({
        success: true,
        data: data,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
);
busRouter.post(
  "/endTrip",
  authenticateAPIKey,
  async (req: Request, res: Response) => {
    try {
      const { busId } = req.body;
      const data = await bus.endCurrentTrip(busId);
      return res.status(200).json({
        success: true,
        data: data,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
);

export default busRouter;
