/**
 * ManageIvaRouter Router
 *
 * This file contains a specification of all routes of gateway-pos Sending.
 *
 * @author Julio Hernandez (e-jhernandez@derco.cl)
 */
import express from "express";
import GatewayPOSController from "../controller/gatewayPOS.controller";
import ITokenRepository from "../../domain/repository/Itoken.repository";
import TokenRepository from "../repository/token.repository";
import Middleware from "../../../shared/middlewares/gatewayPos.middleware";
 
 class GatewayPOSExpressRouter {
     public path = "/api/";
     public router = express.Router();
     private instanceManageTaxesController: GatewayPOSController;

     constructor() {
         this.instanceManageTaxesController = new GatewayPOSController();
         const instanceTokenRepository:ITokenRepository = new TokenRepository();
         const middleware:Middleware = new Middleware(instanceTokenRepository);
         this.router.post(`${this.path}tokens`, this.instanceManageTaxesController.signTC);
         this.router.get(`${this.path}tokens`,[
            middleware.validRouter], this.instanceManageTaxesController.getTC);
     }

 }
 
 export default GatewayPOSExpressRouter;
 