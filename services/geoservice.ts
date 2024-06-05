import axios, { Axios, AxiosInstance } from "axios";
var gju = require("geojson-utils");

const openStreetURL = "http://router.project-osrm.org/";
const nominatimURL = "https://nominatim.openstreetmap.org/";

class Geoservice {
  georouter: AxiosInstance;
  nominatimrouter: AxiosInstance;
  constructor() {
    this.georouter = axios.create({ baseURL: openStreetURL });
    this.nominatimrouter = axios.create({ baseURL: nominatimURL });
  }

  async getRouteBetweenPoints(
    points: Coordinates[],
    profile: "driving" | "car" | "foot" | "bike"
  ) {
    var url = `routes/${profile}/`;
    points.forEach((coordinate) => {
      url = url + `${coordinate.latitude},${coordinate.longitude}:`;
    });
    url = url.slice(0, -1);
    const data = await this.georouter.get<{
      routes: Routes;
      waypoints: Waypoint[];
    }>(url, {
      params: { overview: false },
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

  getDistanceBetweenPoints(points: Coordinates[]): number {
    return gju.pointDistance(
      { type: "Point", coordinates: points[0] },
      { type: "Point", coordinates: points[1] }
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
