/**
 * IvaRepository repository
 *
 * This class implements IvaRepository repository using Mongoose library with Schema (./token.schema.ts)
 *
 * @author Julio Hernandez
 */

import TokenSchema from "./schema/token.schema";
import ITokenRepository from "../../domain/repository/Itoken.repository";
import TC from "gateway-pos/domain/tc";
import { Model } from "mongoose";


class TokenRepository implements ITokenRepository {
  tcSchema: Model<TC, {}, {}, {}, any>;
 
  public async find(token:string): Promise<any> {
    return await TokenSchema
      .findOne({token:token},{_id:0,__v:0}).lean();
  }
  public async create(param: Record<string, any>):Promise<any> {
    return await TokenSchema.create(param);
  }

}

export default TokenRepository;
