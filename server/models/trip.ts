import { model, Schema } from "mongoose";
import { ITrip } from "../interface";

const TripSchema = new Schema<ITrip>(
  {
    terminalsTravelled: {
      type: [{}],
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const TripModel = model("TripModel", TripSchema);
