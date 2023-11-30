/**
 * Initial file to run api server
 *
 */
import { config } from "dotenv";
config();
import { PORT } from "./shared/constants";
import { v1 as uuidv1 } from "uuid";
import App from "./shared/app";
import DatabaseConnection from "./shared/databases.connection";
import GatewayPOSExpressRouter from "./gateway-pos/infrastructure/router/gatewaypos.router";
import ITokenRepository from "./gateway-pos/domain/repository/Itoken.repository";
import ITCRepository from "./gateway-pos/domain/repository/Itc.repository";
import Middleware from "./shared/middlewares/gatewayPos.middleware";
import TokenRepository from "./gateway-pos/infrastructure/repository/token.repository";
import TCRepository from "./gateway-pos/infrastructure/repository/tc.repository";
import Logger from "./shared/log/logger";

async function init() {
  const idTrace:string = uuidv1();
  const databaseConnection = new DatabaseConnection();
  await databaseConnection
    .mongooseDB(idTrace)
    .then(() => {
      const instanceTokenRepository :ITokenRepository = new TokenRepository();
      const middleware:Middleware = new Middleware(instanceTokenRepository);
      const app = new App([new GatewayPOSExpressRouter()],PORT,middleware);
      app.listen();
    })
    .catch((err) => {
      Logger.log(
        {level: "error",
        message:`No existe la TC ${err.message}`,
        status:400,
        idTrace}
      );
    });
}

init();
