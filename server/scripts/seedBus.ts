import { DEFAULT_GEOFENCING_BOUNDARY_COORDINATES } from "../config";
import bus from "../services/bus";

export async function seedBus() {
  const plateNumber = "ABC-123DE";
  const vehicle = await bus.getByPlateNumber(plateNumber);
  if (vehicle) {
    console.log("Vehicle already exists");
    return;
  }
  await bus.create(plateNumber, DEFAULT_GEOFENCING_BOUNDARY_COORDINATES);
}

seedBus();
