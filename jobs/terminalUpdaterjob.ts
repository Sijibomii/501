import Queue from "bull";
import { CronJob } from "cron";
import { REDIS_URL } from "../config";
import Bus from "../services/bus";
import { IBusDocument } from "../models/bus";

export const TerminalUpdaterQueue = new Queue<IBusDocument[]>(
  "TerminalUpdater",
  `redis://${REDIS_URL || "127.0.0.1:6379"}`
);

//Consumer queue process to be performed in background
TerminalUpdaterQueue.process(async function (job, done) {
  try {
    const buses = job.data;
    for (let index = 0; index < buses.length; index++) {
      const bus = buses[index];
      await Bus.updateLastAndNextTerminals(String(bus._id));
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
      const data = await Bus.getAllBusesOnTrip();

      await TerminalUpdaterQueue.add(data, {
        attempts: 3,
        backoff: 3000,
        removeOnComplete: true,
      });
    } catch (error) {
      console.error(error);
    }
  }
);
