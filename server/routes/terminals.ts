import express, { Request, Response } from "express";
import { authenticateAPIKey } from "../services/auth";
import { PositionUpdaterQueue } from "../jobs/positionUpdaterjob";
import Terminal from "../services/terminal";
import trip from "../services/trip";
import bus from "../services/bus";
import geoservice from "../services/geoservice";

let terminalRouter = express.Router();

terminalRouter.get("", async (req: Request, res: Response) => {
  try {
    //check if bus is still within geofence
    const terminals = await Terminal.getAll();
    return res.status(200).json({
      success: true,
      data: terminals,
      message: "Successfully updated position",
    });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ success: true, message: error.message });
  }
});

terminalRouter.post("", async (req: Request, res: Response) => {
  try {
    let { coordinates, displayName } = req.body;
    if (!displayName) {
      displayName = (await geoservice.getInfoOfCoordinate(coordinates))
        .display_name;
    }
    const newTerminal = await Terminal.create(coordinates, displayName);
    return res.status(200).json({
      success: true,
      data: newTerminal,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ success: true, message: error.message });
  }
});

terminalRouter.get("/distance/:id", async (req: Request, res: Response) => {
  try {
    //check if bus is still within geofence
    const id = req.params.id;
    const latitude = Number(req.query.latitude);
    const longitude = Number(req.query.longitude);
    const data = await Terminal.getById(id);
    const routeInfo = await geoservice.getRouteBetweenPoints(
      [data!.coordinates, { latitude, longitude }],
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

terminalRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    //check if bus is still within geofence
    const terminalId = req.params.id;
    const metadata = req.query.metadata;
    const terminal = await Terminal.getById(terminalId);
    if (!terminal) throw new Error("terminal not found");
    if (metadata == "trips") {
      const trips = await trip.getTripsByCoordinates(terminal.coordinates);
      return res.status(200).json({
        success: true,
        data: { terminal, trips },
        message: "Successfully updated position",
      });
    } else if (metadata == "buses") {
      const busesOnTrip = await bus.getAllBusesOnTrip();
      const buses = busesOnTrip.map((bus) => {
        const distance = geoservice.getDistanceBetweenPoints([
          bus.currentPosition,
          terminal.coordinates,
        ]);
        return {
          ...bus,
          distance,
        };
      });
      return res.status(200).json({
        success: true,
        data: { terminal, buses },
      });
    } else {
      return res.status(200).json({
        success: true,
        data: { terminal },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: true, message: error });
  }
});

//TO DO. Do create and delete terminal

export default terminalRouter;
