/**
 * In this file, you find the initialization of express app, intialize of routers and middlewares
 *
 */

import {
  HealthChecker,
  HealthEndpoint, LivenessEndpoint, ReadinessEndpoint
} from "@cloudnative/health-connect";
import * as bodyParser from "body-parser";
import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { v1 as uuidv1 } from "uuid";
import { SWAGGER_OPTIONS } from "./constants";
import Logger from "./log/logger";
import methodOverride from 'method-override'
import Middleware,{ErrorHandler} from "./middlewares/gatewayPos.middleware";

class App {
  public app: express.Application;
  public port: number;
  middleware:Middleware;

  constructor(routers, port,middleware) {
    this.app = express();
    this.port = port;
    this.middleware = middleware;
    this.initializeMiddlewares();
    this.initializeSwagger();
    this.initializeRouters(routers);
    this.initializeErrorHandler();
    
  }

  private initializeErrorHandler() {
    this.app.use(methodOverride());
    this.app.use(ErrorHandler);
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(Middleware.gatewayPOSMiddleware);
  }

  private initializeSwagger() {
    const specs = swaggerJsdoc(SWAGGER_OPTIONS);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  }


  private initializeHealthCheck(): express.Router {
    const heathRouter = express.Router();

    let healthCheck = new HealthChecker();
    heathRouter.use("/live", LivenessEndpoint(healthCheck));
    heathRouter.use("/ready", ReadinessEndpoint(healthCheck));
    heathRouter.use("/health", HealthEndpoint(healthCheck));

    return heathRouter;
  }

  private initializeRouters(routers) {
    routers.forEach((router) => {
      this.app.use("", router.router);
    });
  }


  public listen() {
    this.app.listen(this.port, () => {
      const uuid = uuidv1();
      Logger.log(
        {level: "info",
         message: `App listening on the port ${this.port}`,
         idTrace: uuid}
      );
      this.app.use("/check", this.initializeHealthCheck());
    });
  }
}

export default App;
