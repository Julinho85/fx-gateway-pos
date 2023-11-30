/**
 * TaxesApplication application
 *
 * This class implements TaxesApplication application for invoking TC's method 
 *
 * @author Julio Hernandez
 */
import { instanceToPlain } from "class-transformer";
import Logger from "../../shared/log/logger";
import TC from "../domain/tc";
import {EXPIRATION_MINUTE } from "../../shared/constants";
import moment from "moment";
import ITCRepository from "../domain/repository/Itc.repository";
import TokenHelp from "../helper/token.utils";
import ITokenRepository from "../domain/repository/Itoken.repository";
import Middleware from "../../shared/middlewares/gatewayPos.middleware";
import Token from "../domain/token";


export default class TCApplication {

  tcRepository: ITCRepository;
  tokenRepository: ITokenRepository;
  
  constructor(instanceTcRepository: ITCRepository,
    instanceTokenRepository: ITokenRepository) {

    this.tcRepository = instanceTcRepository;
    this.tokenRepository = instanceTokenRepository;
  
  }

  public async signTC(body: any, idTrace: string): Promise<Record<string,any>> {
    const { card_number, cvv, email,expiration_month,expiration_year } = body;
    const tc: TC = new TC({card_number:card_number,
      cvv:cvv,email:email,expiration_month:expiration_month,
      expiration_year:expiration_year});
    
      const plaintoTC = instanceToPlain(tc);
    
    try {
      Logger.log(
        {level: 'info',
         message: `init signTC TC `,
         status: 201,
         idTrace: idTrace}
      );
      const countTC = await this.tcRepository.exists(plaintoTC.card_number);

      const validexistsTC = countTC ?? false ? true: false;

      if(!validexistsTC){
        Logger.log(
          {level: "error",
          message:`No existe la TC ${plaintoTC.card_number}`,
          status:400,
          idTrace}
        );
        throw new Error(`No existe la TC ${plaintoTC.card_number}`);
      }

      const hashTC = TokenHelp.encryptdata(plaintoTC.card_number);

      const token = new Token({token: TokenHelp.generateToken(),
        data: hashTC,
        expiration_date:moment().add(parseInt(EXPIRATION_MINUTE), 'minute')
        .format('YYYY-MM-DD[T]HH:mm:ss.SSSZ')});

      const inputToken:Record<string,any> = instanceToPlain(token);

      await this.tokenRepository.create(inputToken);
      
      Logger.log(
        {level: 'info',
         message: `sign TC success`,
         status: 201,
         idTrace: idTrace}
      );
      return {token: inputToken.token};
    } catch (err) {
      Logger.log(
        {level: "error",
        message:`error sign TC record :${err.message}`,
        status:400,
        idTrace}
        );
        throw new Error(`Error al autenticar con la tarjeta : ${err.message}`);
      }
    }


    public async getTC(headers: any, idTrace: string): Promise<Record<string,any>> {
      const gatewayPOSHeaders = Middleware.headersToMap(headers);
      const headerAuth:string = gatewayPOSHeaders["authorization"];
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
					  const card_number = TokenHelp.decryptdata(tokenPlain.data);
            const valExistsTC = await this.tcRepository.exists(card_number)
            const evalExistsTC =  valExistsTC ?? false ? true : false;
            if(!evalExistsTC){
              Logger.log(
                {level: "error",
                message: `la TC no existe`,
                idTrace}
              );
              throw new Error('la TC no existe');
            } else {
              const recordTC = await this.tcRepository.find(card_number);   
              return {card_number:recordTC.card_number,
                      expiration_year:recordTC.expiration_year,
                      expiration_month:recordTC.expiration_month};
            }
					}
          else {
            Logger.log(
              {level: "error",
              message: `Token no valido`,
              idTrace}
            );
            throw new Error('Token no valido');
          }
        }
    }
  }

