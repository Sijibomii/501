import { Coordinates } from "../interface";
import { TripModel } from "../models/trip";
import { isValidCoordinate } from "./helpers";

class Trip {
  model = TripModel;

  createNewTrip(terminalsCoordinates: Coordinates[], summary: string) {
    //should add validation to coordinate data
    terminalsCoordinates.forEach((coordinate) => {
      if (!isValidCoordinate(coordinate.latitude, coordinate.longitude)) {
        throw new Error(
          "Invalid coordinates provided in data" +
            coordinate.latitude +
            coordinate.longitude
        );
      }
    });
    return this.model.create({
      terminalsTravelled: terminalsCoordinates,
      summary: summary,
    });
  }

  getById(tripId: string) {
    return this.model.findById(tripId).lean();
  }

  deleteById(tripId: string) {
    return this.model.findByIdAndDelete(tripId);
  }

  getAll() {
    return this.model.find({});
  }

  getTripsByCoordinates(coordinates: Coordinates) {
    return this.model.find({
      terminalsTravelled: coordinates,
    });
  }
}

export default new Trip();
