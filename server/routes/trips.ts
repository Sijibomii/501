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
        let busCurrentLocationInfo;
        let trip;
        if (bus.currentPosition) {
          busCurrentLocationInfo = await geoservice.getInfoOfCoordinate(
            bus.currentPosition
          );
        }
        if (bus.currentTrip) {
          trip = await Trip.getById(bus.currentTrip!);
        }
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
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ success: true, message: error.message });
  }
});

tripRouter.post("/", async (req: Request, res: Response) => {
  try {
    // const { terminals, description } = req.body;
    const terminals = [
      { latitude: 7.5163, longitude: 4.5227 },
      { latitude: 7.508, longitude: 4.453 },
      { latitude: 7.4996, longitude: 4.3833 },
      { latitude: 7.4913, longitude: 4.3136 },
      { latitude: 7.483, longitude: 4.2439 },
      { latitude: 7.4746, longitude: 4.1741 },
      { latitude: 7.4663, longitude: 4.1044 },
      { latitude: 7.458, longitude: 4.0347 },
      { latitude: 7.4496, longitude: 3.965 },
      { latitude: 7.4413, longitude: 3.8953 },
    ];

    const trip = await Trip.createNewTrip(
      terminals,
      "Trip from Obafemi Awolowo University, Ile-Ife  to University of Ibadan, Oyo"
    );
    // const trip = await Trip.createNewTrip(terminals, description);

    return res.status(200).json({
      success: true,
      data: trip,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ success: true, message: error.message });
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
