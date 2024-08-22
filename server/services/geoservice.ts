import axios, { Axios, AxiosInstance } from "axios";
import { CoordinateInfo, Coordinates, Routes, Waypoint } from "../interface";
var gju = require("geojson-utils");

const openStreetURL = " https://routing.openstreetmap.de/routed-car/";
const nominatimURL = "https://nominatim.openstreetmap.org/";

class Geoservice {
  georouter: AxiosInstance;
  nominatimrouter: AxiosInstance;
  constructor() {
    this.georouter = axios.create({ baseURL: openStreetURL });
    this.nominatimrouter = axios.create({
      baseURL: nominatimURL,
      headers: {
        "User-Agent": "https://server-summer-thunder-1131.fly.dev/ ",
      },
    });
  }

  async getRouteBetweenPoints(
    points: Coordinates[],
    profile: "driving" | "car" | "foot" | "bike"
  ) {
    var url = `route/v1/${profile}/`;
    points.forEach((coordinate) => {
      url = url + `${coordinate.latitude},${coordinate.longitude};`;
    });
    url = url.slice(0, -1);
    const data = await this.georouter.get<{
      routes: Routes[];
      waypoints: Waypoint[];
    }>(url, {
      params: { overview: false, alternatives: false, steps: false },
    });
    return data.data;
  }

  async getInfoOfCoordinate(point: Coordinates) {
    const res = await this.nominatimrouter.get<CoordinateInfo>(`reverse`, {
      params: {
        lat: point.latitude,
        lon: point.longitude,
        format: "json",
      },
    });
    return res.data;
  }

  async getDistanceBetweenPoints(
    points: Coordinates[],
    mode: "driving" = "driving"
  ): Promise<number> {
    if (mode == "driving") {
      const routeData = await this.getRouteBetweenPoints(points, "driving");
      return routeData.routes[0].distance;
    }
    return gju.pointDistance(
      { type: "Point", coordinates: [points[0].latitude, points[0].longitude] },
      { type: "Point", coordinates: [points[1].latitude, points[1].longitude] }
    );
  }

  pointInpolygon(point: Coordinates, boundaries: Coordinates[]): boolean {
    return Boolean(
      gju.pointInPolygon(
        { type: "Point", coordinates: [point.latitude, point.longitude] },
        {
          type: "Polygon",
          coordinates: [
            boundaries.map((boundary) => {
              return [boundary.latitude, boundary.longitude];
            }),
          ],
        }
      )
    );
  }
}

export default new Geoservice();
