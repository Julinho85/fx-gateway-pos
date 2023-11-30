
import Logger from "../../shared/log/logger";
import {EXPIRATION_MINUTE,PATTERN_ECOMMERCE } from "../../shared/constants";
import moment from "moment";
import ITokenRepository from "../domain/repository/Itoken.repository";


export default class TokenApplication {

  tokenRepository: ITokenRepository;
  static miliseconds_expirate:number = parseInt(EXPIRATION_MINUTE)* 60000;
  
  constructor(instanceTokenRepository: ITokenRepository) {
    this.tokenRepository = instanceTokenRepository;
  }

  private validateKeyEcommerce(keyEcommerce: String) {
    if (keyEcommerce !== undefined && keyEcommerce != null) {
        const resultMatch = keyEcommerce.match(PATTERN_ECOMMERCE);
        const evalExpression = resultMatch ?? false ? true : false;
        if (!evalExpression)
            throw new Error("el header ecommerce no cumple con las condiciones");
    }
}

private validateExpirationDate(expiration_date: string) {
    const dateToken = moment(expiration_date,
        'YYYY-MM-DD[T]HH:mm:ss.SSSZ').valueOf();
    const nowHora = moment().valueOf();
    if (nowHora - TokenApplication.miliseconds_expirate > dateToken) {
        throw new Error('El token ha expirado');
    }
}

  public async validateToken(gatewayPOSHeaders:Record<string,any>,idTrace:string) : Promise<void>{
            const headerAuth:string = gatewayPOSHeaders["authorization"];
			const keyEcommerce:String = gatewayPOSHeaders["x-gateway-pos-key"];
			try {
			    this.validateKeyEcommerce(keyEcommerce);
		
				const evalAuth = headerAuth ?? false ? headerAuth !==null
				&& headerAuth.length > 0 ? true : false : false
					
				if(!evalAuth)	{
					Logger.log(
						{level: "error",
						message: `la key no corresponde al comercio`,
                        status: 400,
						idTrace: idTrace}
					);
					throw new Error('la key no corresponde al comercio');
				}
					
				else {
					const token:string = headerAuth.split(' ').slice(-1).pop();
					const tokenPlain = await this.tokenRepository.find(token);
					const evalTokenPlain =  tokenPlain ?? false ? true : false;

					if (evalTokenPlain)	{
                        Logger.log(
                            {level: "info",
                            message: `Validate token expiration`,
                            status: 200,
                            idTrace: idTrace}
                        );
						this.validateExpirationDate(tokenPlain.expiration_date);
					}
				}
			
		    } catch(err){
                Logger.log(
                    {level: "error",
                     message: `la key no corresponde al comercio`,
                    idTrace: idTrace}
                );
                throw new Error(`Hubo una excepcion al validar el token:${err.message}`);
		}
  }
}