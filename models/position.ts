import { model, Schema } from "mongoose";

const BusPositionSchema = new Schema<IBusPosition>(
  {
    coordinates: {
      required: true,
    },
    metadata: {
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
