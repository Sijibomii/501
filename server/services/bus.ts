import { MINIMUM_DISTANCE_TO_CHANGE_TERMINALS } from "../config";
import { Coordinates } from "../interface";
import { BusModel } from "../models/bus";
import geoservice from "./geoservice";
import { isValidCoordinate } from "./helpers";
import terminal from "./terminal";
import Trip from "./trip";

class Bus {
  model = BusModel;

  create(plateNumber: string, defaultBoundaryCoordinates: Coordinates[]) {
    defaultBoundaryCoordinates.forEach((coordinate) => {
      if (!isValidCoordinate(coordinate.latitude, coordinate.longitude)) {
        throw new Error(
          "Invalid coordinates provided in data" +
            coordinate.latitude +
            coordinate.longitude
        );
      }
    });
    return this.model.create({
      plateNumber,
      geoFencingBoundaries: defaultBoundaryCoordinates,
    });
  }

  async getById(busId: string) {
    const bus = await this.model.findById(busId).lean();
    if (!bus) throw new Error("Bus of id not found");

    let trip;
    let currentPosition;
    let isInGeofence;
    if (bus.currentPosition) {
      currentPosition = await geoservice.getInfoOfCoordinate(
        bus.currentPosition
      );
      if (bus.currentTrip) {
        trip = await Trip.getById(bus.currentTrip);
        isInGeofence = geoservice.pointInpolygon(
          bus.currentPosition,
          trip!.geofenceBoundaries
        );
      }
    }

    return {
      ...bus,
      currentPositionInfo: currentPosition?.display_name,
      isInGeofence,
    };
  }

  getByPlateNumber(plateNumber: string) {
    return this.model.findOne({ plateNumber }).lean();
  }

  async initiateNewTrip(busId: string, tripId: string) {
    const trip = await Trip.getById(tripId);
    const bus = await this.getById(busId);

    if (!trip) throw new Error("Invalid tripId provided");
    if (!bus) throw new Error("Invalid busId provided");
    if (bus.currentTrip) {
      throw new Error("Previous bus trip has not ended");
    }
    const lastTerminalId = (
      await terminal.getByCoordinates(trip.terminalsTravelled[0])
    )?.id;
    const nextTerminalId = (
      await terminal.getByCoordinates(trip.terminalsTravelled[1])
    )?.id;

    return this.model.findByIdAndUpdate(busId, {
      currentTrip: tripId,
      currentTripStartedAt: Date.now(),
      lastTerminal: lastTerminalId,
      nextTerminal: nextTerminalId,
    });
  }

  async endCurrentTrip(busId: string) {
    const bus = await this.getById(busId);
    if (!bus) throw new Error("Invalid busId provided");
    if (!bus.currentTrip) throw new Error("Bus is not on a current trip");
    return this.model.findByIdAndUpdate(busId, {
      $unset: {
        currentTrip: 1,
        lastTerminal: 1,
        currentTripStartedAt: 1,
        nextTerminal: 1,
      },
      $set: {
        currentTripEndedAt: Date.now(),
      },
    });
  }

  getAllBusesOnTrip() {
    return this.model
      .find({
        currentTrip: { $exists: true },
      })
      .lean();
  }

  async setCurrentPosition(busId: string, coordinates: Coordinates) {
    const bus = await this.getById(busId);
    if (!bus) throw new Error("Invalid busId provided");
    return this.model.findByIdAndUpdate(busId, {
      currentPosition: coordinates,
    });
  }
  async updateLastAndNextTerminals(busId: string) {
    const bus = await this.getById(busId);
    if (!bus) throw new Error("Bus not found");
    const currentTrip = await Trip.getById(bus.currentTrip!);
    if (!currentTrip || currentTrip.terminalsTravelled.length < 2) {
      return { lastTerminal: null, nextTerminal: null };
    }

    const { terminalsTravelled } = currentTrip;
    let lastTerminal: Coordinates | null | undefined = null;
    let nextTerminal: Coordinates | null = null;

    const currentTerminal = await terminal.getById(bus.lastTerminal!);
    lastTerminal = currentTerminal?.coordinates;
    const indexOf = terminalsTravelled.findIndex((terminal) => {
      return (
        terminal.latitude == currentTerminal?.coordinates.latitude &&
        terminal.longitude == currentTerminal.coordinates.longitude
      );
    });

    if (indexOf == terminalsTravelled.length - 1) {
      return;
    }
    if (!currentTerminal) throw new Error("current terminal ");

    const next = terminalsTravelled[indexOf + 1];

    const [distanceToCurrent, distanceToNext, distanceBetweenTerminals] =
      await Promise.all([
        geoservice.getDistanceBetweenPoints([
          bus.currentPosition,
          currentTerminal.coordinates,
        ]),
        geoservice.getDistanceBetweenPoints([bus.currentPosition, next]),
        geoservice.getDistanceBetweenPoints([
          currentTerminal.coordinates,
          next,
        ]),
      ]);
    console.log(
      indexOf,
      distanceToCurrent,
      distanceToNext,
      currentTerminal,
      bus.currentPosition
    );

    if (
      (distanceToNext < distanceToCurrent &&
        distanceToNext < MINIMUM_DISTANCE_TO_CHANGE_TERMINALS) ||
      distanceToCurrent > distanceBetweenTerminals
    ) {
      console.log("Changing terminal");
      lastTerminal = next;
      nextTerminal = terminalsTravelled[indexOf + 2];
      // break;
    }

    for (let i = 0; i < terminalsTravelled.length - 1; i++) {}

    // If the bus has not yet passed the first terminal, or has passed all terminals
    // if (!lastTerminal) {
    //   lastTerminal = terminalsTravelled[terminalsTravelled.length - 2];
    //   nextTerminal = terminalsTravelled[terminalsTravelled.length - 1];
    // }

    const lastTerminalId = await terminal.getByCoordinates(lastTerminal!);
    var nextTerminalId;
    if (nextTerminal) {
      nextTerminalId = await terminal.getByCoordinates(nextTerminal);
    }

    await this.model.findByIdAndUpdate(busId, {
      lastTerminal: lastTerminalId?.id,
      nextTerminal: nextTerminalId?.id,
    });
  }

  getAll() {
    return this.model.find({});
  }
}

export default new Bus();
