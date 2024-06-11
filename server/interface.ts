export interface IBusPosition {
  coordinates: Coordinates;
  metadata: { busId: string; tripId: string };
  createdAt: string | Date;
}

export interface IBusTerminal {
  coordinates: Coordinates;
  displayName: string;
}

export interface ITrip {
  terminalsTravelled: Coordinates[]; //array of terminals where the bus has to travel to. Length must be more than 2. First element is starting point, last element is final destination
  summary: string;
  geofenceBoundaries: Coordinates[];
}

export interface IBus {
  plateNumber: string;
  currentPosition: Coordinates;
  geoFencingBoundaries: Coordinates[];
  currentTrip?: string;
  currentTripStartedAt?: Date;
  currentTripEndedAt?: Date;
  lastTerminal?: string;
  nextTerminal?: string;
}

export interface RouteLeg {
  steps: any[];
  summary: string;
  weight: number;
  duration: number;
  distance: number;
}
export type Coordinates = { latitude: number; longitude: number };

export interface Routes {
  legs: RouteLeg[];
  weight_name: "routability";
  weight: number;
  duration: number;
  distance: number;
}

export interface Waypoint {
  hint: string;
  distance: number;
  name: string;
  location: number[];
}

export interface CoordinateInfo {
  place_id: number;
  licence: string;
  osm_type: "way";
  osm_id: number;
  lat: string;
  lon: string;
  class: "highway";
  type: "residential";
  place_rank: number;
  importance: number;
  addresstype: "road";
  name: "";
  display_name: string;
  address: {
    county: string;
    state: string;
    "ISO3166-2-lvl4": "NG-LA";
    postcode: string;
    country: string;
    country_code: string;
  };
  boundingbox: ["6.5242277", "6.5257386", "3.3780210", "3.3793835"];
}
