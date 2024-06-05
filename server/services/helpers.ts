function isValidCoordinate(latitude: number, longitude: number) {
  const isLatitudeValid =
    typeof latitude === "number" && latitude >= -90 && latitude <= 90;

  const isLongitudeValid =
    typeof longitude === "number" && longitude >= -180 && longitude <= 180;

  return isLatitudeValid && isLongitudeValid;
}
