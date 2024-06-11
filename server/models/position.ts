import { model, Schema } from "mongoose";
import { IBusPosition } from "../interface";

const BusPositionSchema = new Schema<IBusPosition>(
  {
    coordinates: {
      type: {},
      required: true,
    },
    metadata: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
    timeseries: {
      timeField: "createdAt",
      metaField: "metadata",
      granularity: "minutes",
    },
    expireAfterSeconds: 60 * 60 * 24 * 7, //7 days
  }
);

export const BusPositionModel = model("BusPositionModel", BusPositionSchema);
