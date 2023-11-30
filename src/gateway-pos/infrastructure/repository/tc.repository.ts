/**
 * IvaRepository repository
 *
 * This class implements IvaRepository repository using Mongoose library with Schema (./tc.schema.ts)
 *
 * @author Julio Hernandez
 */

import TCSchema from "./schema/tc.schema";
import ITCRepository from "../../domain/repository/Itc.repository";
import TC from "gateway-pos/domain/tc";
import { Model } from "mongoose";


class TCRepository implements ITCRepository {

  public async find(card_number:string): Promise<any> {
    return await TCSchema
      .findOne({card_number:card_number},{_id:0,__v:0}).lean();
  }
  public async create(param: Record<string, any>):Promise<any> {
    return await TCSchema.create(param);
  }

  public async exists(card_number:string): Promise<any> {
    return await TCSchema
      .count({card_number:card_number});
  }

}

export default TCRepository;
