import * as dotenv from "dotenv";
dotenv.config();

export const PORT = Number(process.env.PORT || 8000);
export const REDIS_URL = process.env.REDIS_URL;
export const uri = String(process.env.MONGO_URI);
export const SERVER_API_KEY = String(process.env.SERVER_API_KEY);
export const ADMIN_API_KEY = String(process.env.ADMIN_API_KEY);

export const DEFAULT_GEOFENCING_BOUNDARY_COORDINATES = [
  {
    latitude: 7.4413,
    longitude: 3.8953,
  },
  {
    latitude: 7.5163,
    longitude: 3.8953,
  },
  {
    latitude: 7.4413,
    longitude: 4.5227,
  },
  {
    latitude: 7.5163,
    longitude: 4.5227,
  },
];

export const MINIMUM_DISTANCE_TO_CHANGE_TERMINALS = 300;
