import { model, Schema, Types } from "mongoose";
import { IBusTerminal } from "../interface";

const BusTerminalSchema = new Schema<IBusTerminal>(
  {
    coordinates: {
      type: {},
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const BusTerminalModel = model("BusTerminalModel", BusTerminalSchema);
