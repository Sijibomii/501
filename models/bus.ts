import { Document, model, Schema } from "mongoose";

export interface IBusDocument extends Document, IBus {}

const BusSchema = new Schema<IBus>(
  {
    plateNumber: { required: true, unique: true },
    currentPosition: {},
    geoFencingBoundaries: { required: true },
    currentTrip: {
      type: "ObjectId",
      ref: "TripModel",
    },
  },
  {
    timestamps: true,
    expireAfterSeconds: 60 * 60 * 24 * 7, //7 days
  }
);

export const BusModel = model("BusModel", BusSchema);
