/**
 * ManageIva Controller
 *
 * This file contains the middlewares between route and the "use case" or "application".
 * Extract the necesary data from express.Request
 *
 * @author Julio Hernandez (e-jhernandez@derco.cl)
 *
 */

import { NextFunction, Request, Response } from "express";
import TCApplication from "../../application/tc.case.application";
import TCRepository from "../repository/tc.repository";
import ITCRepository from "../../domain/repository/Itc.repository";
import TokenRepository from "../repository/token.repository";
import ITokenRepository from "../../domain/repository/Itoken.repository";
 
 class GatewayPOSController {
    private instanceapplication:TCApplication;
     constructor() {
       const instanceTcRepository:ITCRepository = new TCRepository();
       const instanceTokenRepository:ITokenRepository = new TokenRepository();
       this.instanceapplication = new TCApplication(instanceTcRepository,instanceTokenRepository);
     }
     signTC = async (request: Request, response: Response, next: NextFunction) => {
         const body = request.body;
         let outtoken:Record<string,any> ={}
         try {
             const { ["x-gateway-pos-idtrace"]: idTrace } = request["gateway-pos"];
             outtoken = await this.instanceapplication.signTC(body,idTrace);
         } catch (err) {
              return next(err);
         }
         return response.status(201).send( {...outtoken} );
     };
     getTC = async (request: Request, response: Response, next: NextFunction) => {
        const {headers } = request;
        let outtc:Record<string,any> ={}
        try {
            const { ["x-gateway-pos-idtrace"]: idTrace } = request["gateway-pos"];
            outtc = await this.instanceapplication.getTC(headers,idTrace);
        } catch (err) {
             return next(err);
        }
        return response.status(201).send( {...outtc} );
    };
 }
 
 export default GatewayPOSController;
 