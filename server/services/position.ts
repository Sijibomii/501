import { BusPositionModel } from "../models/position";
import Bus from "./bus";

class Position {
  model = BusPositionModel;

  async create(busId: string, coordinates: Coordinates) {
    const bus = await Bus.getById(busId);
    if (!bus) throw new Error("Invalid busId provided");
    return this.model.create({
      coordinates,
      metadata: {
        busId,
        tripId: bus.currentTrip,
      },
    });
  }

  getByTimestamp(timestamp: number) {
    return this.model.find({
      createdAt: new Date(timestamp).toISOString(),
    });
  }

  getByBusId(busId: string) {
    return this.model
      .find({
        "metaField.busId": busId,
      })
      .lean();
  }

  getByBusIdAndTimestamp(busId: string, timestamp: number) {
    return this.model
      .find({
        "metaField.busId": busId,
        createdAt: new Date(timestamp),
      })
      .lean();
  }
}

export default new Position();
