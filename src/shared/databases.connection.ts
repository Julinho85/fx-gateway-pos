/**
 * Database connection
 *
 * This file is used to connect to a Database engine. The database connection is stored in "db" variable to use in external file
 *
 */

import {MONGO_URI} from "./constants";
import { connect, disconnect } from "mongoose";
import { v1 as uuidv1 } from "uuid";
import Logger from "./log/logger";

export default class DatabaseConnection {
  public db: any;

  /**
   * Connect to Mongodb with Mongoose
   */
  async mongooseDB(idTrace:string) {
    Logger.log(
      {level: "info",
       message: `Connecting to mongodb...`,
       idTrace: idTrace}
    );
    return connect(MONGO_URI)
      .then(async () => {
        Logger.log(
          {level: "info",
           message: `Connected to MongoDB With Mongoose `,
           idTrace: idTrace}
        );
      })
      .catch((err) => {
        Logger.log(
          {level: "error",
           message: `error to init Data TC `,
           status:400,
           idTrace: idTrace}
        );
        throw new Error(err);
      });
  }

  async disconnectDBClients() {
    return disconnect();
  }
}
