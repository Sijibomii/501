import { Coordinates } from "../interface";

export function isValidCoordinate(latitude: number, longitude: number) {
  const isLatitudeValid =
    typeof latitude === "number" && latitude >= -90 && latitude <= 90;

  const isLongitudeValid =
    typeof longitude === "number" && longitude >= -180 && longitude <= 180;

  return isLatitudeValid && isLongitudeValid;
}

function rectangularBoundary(coordinates: Coordinates[]): Coordinates[] {
  // Initialize min and max values
  let minLat: number = Infinity;
  let maxLat: number = -Infinity;
  let minLon: number = Infinity;
  let maxLon: number = -Infinity;

  // Loop through coordinates to find the min and max latitudes and longitudes
  for (let i = 0; i < coordinates.length; i++) {
    const lat = coordinates[i].latitude;
    const lon = coordinates[i].longitude;
    if (lat < minLat) {
      minLat = lat;
    }
    if (lat > maxLat) {
      maxLat = lat;
    }
    if (lon < minLon) {
      minLon = lon;
    }
    if (lon > maxLon) {
      maxLon = lon;
    }
  }

  // Define the vertices of the rectangular boundary
  const bottomLeft: Coordinates = { latitude: minLat, longitude: minLon };
  const topLeft: Coordinates = { latitude: maxLat, longitude: minLon };
  const bottomRight: Coordinates = { latitude: minLat, longitude: maxLon };
  const topRight: Coordinates = { latitude: maxLat, longitude: maxLon };

  return [bottomLeft, topLeft, bottomRight, topRight];
}
