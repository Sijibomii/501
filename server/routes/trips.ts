import express, { Request, Response } from "express";
import { authenticateAPIKey } from "../services/auth";
import bus from "../services/bus";
import Trip from "../services/trip";
import geoservice from "../services/geoservice";

let tripRouter = express.Router();

tripRouter.get("/active", async (req: Request, res: Response) => {
  try {
    //check if bus is still within geofence
    const busesOnTrip = await bus.getAllBusesOnTrip();
    const trips = await Promise.all(
      busesOnTrip.map(async (bus) => {
        const busCurrentLocationInfo = await geoservice.getInfoOfCoordinate(
          bus.currentPosition
        );
        const trip = await Trip.getById(bus.currentTrip!);
        return {
          ...trip,
          bus: { ...bus, busCurrentLocationInfo },
        };
      })
    );
    return res.status(200).json({
      success: true,
      data: trips,
    });
  } catch (error) {
    return res.status(400).json({ success: true, message: error });
  }
});

tripRouter.get("/", async (req: Request, res: Response) => {
  try {
    const trips = await Trip.getAll();
    return res.status(200).json({
      success: true,
      data: trips,
    });
  } catch (error) {}
});

tripRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const tripId = req.params.id;
    const trip = await Trip.getById(tripId);
    if (!trip) throw new Error("Trip not found");
    const busesOnTrip = await bus.getAllBusesOnTrip();
    const busOnRoute = busesOnTrip.filter(
      (bus) => bus.currentTrip?.toString() == trip._id.toString()
    );
    if (busOnRoute.length == 0) {
      return res.status(200).send({
        success: true,
        data: { trip },
      });
    }

    return res.status(200).json({
      success: true,
      data: { trip, bus },
    });
  } catch (error) {
    return res.status(400).json({ success: true, message: error });
  }
});

export default tripRouter;
