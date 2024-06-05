import { model, Schema } from "mongoose";

const TripSchema = new Schema<ITrip>(
  {
    terminalsTravelled: {
      required: true,
    },
    summary: {
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const TripModel = model("TripModel", TripSchema);
