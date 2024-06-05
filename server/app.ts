import mongoose from "mongoose";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import { PORT, uri } from "./config";
import express, { Request, Response } from "express";

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
app.use(urlencoded({ extended: true }));
app.use(json({ limit: "50mb" }));
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.get("", async (req: Request, res: Response) => {
  res.status(200).send("Pinged Server");
});

app.listen(PORT, async () => {
  console.log("Started listening on port", PORT);
});
