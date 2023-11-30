/**
 * Gateway-pos middleware
 *
 * This middleware is use to handle
 *
 */

import { NextFunction, Request, Response } from "express";
import { v1 as uuidv1 } from "uuid";
import Logger from "../log/logger";
import ITokenRepository from "../../gateway-pos/domain/repository/Itoken.repository";
import { IncomingHttpHeaders } from "http";
import TokenApplication from "../../gateway-pos/application/token.case.application";

export default class Middleware {
	 tokenApp:TokenApplication;

	constructor(instanceTokenRepository: ITokenRepository) {	
		this.tokenApp = new TokenApplication(instanceTokenRepository);
	}

 static gatewayPOSMiddleware =  (request: Request, response: Response, next: NextFunction): void =>
	  {
		const { headers} = request;
	
		const gatewayPOSHeaders = Middleware.headersToMap(headers);
	
		gatewayPOSHeaders["x-gateway-pos-idtrace"] = gatewayPOSHeaders["x-gateway-pos-idtrace"] || uuidv1();
		request["gateway-pos"] = gatewayPOSHeaders;
	
		return next();
	}

	validRouter = async (request: Request, response: Response, next: NextFunction): Promise<void> =>	{
		const { headers } = request;
		try {
			const gatewayPOSHeaders = Middleware.headersToMap(headers);
			await this.tokenApp.validateToken(gatewayPOSHeaders,gatewayPOSHeaders["x-gateway-pos-idtrace"]);
		}catch(err){
			response.status(500).send({error:err.message});
			throw new Error(err.message);
		}

		return next();
	}

	public static headersToMap(headers: IncomingHttpHeaders) {
		const gatewayPOSHeaders = {};
		Object.keys(headers).forEach(function (headerKey) {
			if (headerKey.toLocaleLowerCase().startsWith("x-gateway-pos") ||
				headerKey.toLocaleLowerCase() === "authorization") {
				gatewayPOSHeaders[headerKey] = headers[headerKey];
			}
		});
		return gatewayPOSHeaders;
	}


}

	export const ErrorHandler = (err:any, request: Request,
		response: Response,
		next: NextFunction):void => {
			if(err.stack){
				const { ["x-gateway-pos-idtrace"]: idTrace } = request["gateway-pos"];
				uuidv1
				Logger.log(
					{level: "error",
					 message: `Exception : ${err.stack}`,
					idTrace}
				  );
				response.status(500).send({error:err.message});
			  }
		 return next();
	}


