import { BusTerminalModel } from "../models/terminal";
import Geoservice from "./geoservice";

class Terminal {
  model = BusTerminalModel;

  async create(coordinates: Coordinates, displayName: string) {
    if (!isValidCoordinate(coordinates.latitude, coordinates.longitude))
      throw new Error("Invalid coordinates provided for terminal");

    if (!displayName) {
      displayName = (await Geoservice.getInfoOfCoordinate(coordinates))
        .display_name;
    }

    return this.model.create({
      coordinates,
      displayName,
    });
  }

  getById(terminalId: string) {
    return this.model.findById(terminalId).lean();
  }

  deleteById(terminalId: string) {
    //TO-DO delete all trips with this termianl in its routes
    return this.model.findByIdAndDelete(terminalId);
  }
}

export default new Terminal();
