import { DEFAULT_GEOFENCING_BOUNDARY_COORDINATES } from "../config";
import bus from "../services/bus";

export async function seedBus() {
  const plateNumber = "ABC-123DE";
  await bus.create(plateNumber, DEFAULT_GEOFENCING_BOUNDARY_COORDINATES);
}

seedBus();
