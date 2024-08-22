import mongoose from "mongoose";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import { PORT, uri } from "./config";
import express, { Request, Response } from "express";
import busRouter from "./routes/bus";
import positionRouter from "./routes/positions";
import terminalRouter from "./routes/terminals";
import tripRouter from "./routes/trips";
import morgan from "morgan";
import { run } from "./scripts/main";

console.log(uri, PORT);
mongoose
  .connect(uri, { maxPoolSize: 10000, serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(err);
    console.error("Could not connect to database");
  });

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));
app.use(json({ limit: "50mb" }));
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use("/bus", busRouter);
app.use("/position", positionRouter);
app.use("/terminal", terminalRouter);
app.use("/trip", tripRouter);

app.get("", async (req: Request, res: Response) => {
  res.status(200).send("Pinged Server");
});

app.listen(PORT, async () => {
  // await run();
  console.log("Started listening on port", PORT);
});
