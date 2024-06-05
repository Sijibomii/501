import { model, Schema, Types } from "mongoose";

const BusTerminalSchema = new Schema<IBusTerminal>(
  {
    coordinates: {
      required: true,
    },
    displayName: {
      required: true,
    },
  },
  { timestamps: true }
);

export const BusTerminalModel = model("BusTerminalModel", BusTerminalSchema);
