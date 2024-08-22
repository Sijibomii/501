import mongoose from "mongoose";
import { uri } from "../config";
import { seedBus } from "./seedBus";
import { seedTrip } from "./seedTrip";
import { seedTerminals } from "./seedTerminal";

export async function run() {
  mongoose
    .connect(uri, { maxPoolSize: 10000, serverSelectionTimeoutMS: 5000 })
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((err) => {
      console.log(err);
      console.error("Could not connect to database");
    });

  await seedBus();
  await seedTrip();
  // await seedTerminals();
  console.log("done");
}
