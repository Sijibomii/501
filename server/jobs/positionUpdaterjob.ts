import Queue from "bull";
import { CronJob } from "cron";
import { REDIS_URL } from "../config";
import Position from "../services/position";
import Bus from "../services/bus";
import Geoservice from "../services/geoservice";
import Trip from "../services/trip";

export const PositionUpdaterQueue = new Queue<any>(
  "PositionUpdater",
  `redis://${REDIS_URL || "127.0.0.1:6379"}`
);

//Consumer queue process to be performed in background
PositionUpdaterQueue.process(async function (job, done) {
  try {
    const { latitude, longitude, plateNumber } = job.data;
    console.log(job.data);
    //use Queue to process data
    const bus = await Bus.getByPlateNumber(plateNumber);
    await Position.create(bus!._id.toString(), { latitude, longitude });
    //update current Poisition of bus.
 
    await Bus.setCurrentPosition(bus!._id.toString(), {
      latitude,
      longitude,
    });

    if (bus?.currentTrip) {
      const trip = await Trip.getById(bus.currentTrip);
      await Bus.updateLastAndNextTerminals(String(bus._id));
      if (trip?.geofenceBoundaries) {
        const isInGeofence = Geoservice.pointInpolygon(
          { latitude, longitude },
          trip!.geofenceBoundaries
        );
        if (!isInGeofence) {
          //alert control centre
          console.log("Bus is not in geofence");
        }
      }
    }
    done();
  } catch (error: any) {
    console.error(error);
    done(error);
  }
});

//job to run
export var analyticSummaryWorker = new CronJob(
  "* */10 * * *",
  async function () {
    try {
      const data = {};
    } catch (error) {
      console.error(error);
    }
  }
);
