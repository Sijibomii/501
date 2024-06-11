import mongoose from "mongoose";
import geoservice from "../services/geoservice";
import Terminal from "../services/terminal";
import { uri } from "../config";

async function seedTerminals() {
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
  //   for (let index = 0; index < terminals.length; index++) {
  //     const terminal = terminals[index];
  //     const coordinateInfo = await geoservice.getInfoOfCoordinate(terminal);
  //     const displayName = `Terminal ${index + 1} around ${
  //       coordinateInfo.display_name
  //     }`;
  //     await Terminal.create(terminal, displayName);
  //   }

  console.log(await Terminal.getByCoordinates(terminals[1]));

  console.log("Successfully created terminals");
}

seedTerminals();
