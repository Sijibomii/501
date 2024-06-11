import { Document, model, Schema } from "mongoose";
import { IBus } from "../interface";

export interface IBusDocument extends Document, IBus {}

const BusSchema = new Schema<IBus>(
  {
    plateNumber: { type: String, required: true, unique: true },
    currentPosition: {},
    geoFencingBoundaries: {
      type: [{}],
      required: true,
    },
    currentTrip: {
      type: "ObjectId",
      ref: "TripModel",
    },
    currentTripStartedAt: {
      type: Date,
    },
    currentTripEndedAt: {
      type: Date,
    },
    lastTerminal: { type: String },
    nextTerminal: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const BusModel = model("BusModel", BusSchema);
