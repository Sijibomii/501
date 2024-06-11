import trip from "../services/trip";

export async function seedTrip() {
  const terminals = [
    { latitude: 7.5163, longitude: 4.5227 },
    { latitude: 7.508, longitude: 4.453 },
    { latitude: 7.4996, longitude: 4.3833 },
    { latitude: 7.4913, longitude: 4.3136 },
    { latitude: 7.483, longitude: 4.2439 },
    { latitude: 7.4746, longitude: 4.1741 },
    { latitude: 7.4663, longitude: 4.1044 },
    { latitude: 7.458, longitude: 4.0347 },
    { latitude: 7.4496, longitude: 3.965 },
    { latitude: 7.4413, longitude: 3.8953 },
  ];

  await trip.createNewTrip(
    terminals,
    "Trip from Obafemi Awolowo University, Ile-Ife  to University of Ibadan, Oyo"
  );
}
