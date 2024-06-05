import * as dotenv from "dotenv";
dotenv.config();

export const PORT = Number(process.env.PORT || 8000);
export const REDIS_URL = Number(process.env.REDIS_URL || 8000);
export const uri = String(process.env.MONGO_URI);
export const SERVER_API_KEY = String(process.env.SERVER_API_KEY);
export const ADMIN_API_KEY = String(process.env.ADMIN_API_KEY);

export const GEOFENCING_BOUNDARY_COORDINATES = [
  [0, 0],
  [6, 0],
  [6, 6],
  [0, 6],
];
