import { BusModel } from "../models/bus";
import geoservice from "./geoservice";
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

  getById(busId: string) {
    return this.model.findById(busId).lean();
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
    return this.model.findByIdAndUpdate(busId, {
      currentTrip: tripId,
      lastTerminal: trip.terminalsTravelled[0],
      nextTerminal: trip.terminalsTravelled[1],
    });
  }

  async endCurrentTrip(busId: string) {
    const bus = await this.getById(busId);
    if (!bus) throw new Error("Invalid busId provided");
    if (!bus.currentTrip) throw new Error("Bus is not on a current trip");
    return this.model.findByIdAndUpdate(busId, {
      $unset: { currentTrip: 1, lastTerminal: 1, nextTerminal: 1 },
    });
  }

  getAllBusesOnTrip() {
    return this.model.find({
      currentTrip: { $exists: true },
    });
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
    let lastTerminal: Coordinates | null = null;
    let nextTerminal: Coordinates | null = null;

    for (let i = 0; i < terminalsTravelled.length - 1; i++) {
      const currentTerminal = terminalsTravelled[i];
      const next = terminalsTravelled[i + 1];

      const distanceToCurrent = geoservice.getDistanceBetweenPoints([
        bus.currentPosition,
        currentTerminal,
      ]);
      const distanceToNext = geoservice.getDistanceBetweenPoints([
        bus.currentPosition,
        next,
      ]);

      if (distanceToNext < distanceToCurrent) {
        lastTerminal = currentTerminal;
        nextTerminal = next;
        break;
      }
    }

    // If the bus has not yet passed the first terminal, or has passed all terminals
    if (!lastTerminal) {
      lastTerminal = terminalsTravelled[terminalsTravelled.length - 2];
      nextTerminal = terminalsTravelled[terminalsTravelled.length - 1];
    }

    this.model.findByIdAndUpdate(busId, {
      lastTerminal: lastTerminal,
      nextTerminal: nextTerminal,
    });
  }
}

export default new Bus();
