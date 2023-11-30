import * as fs from 'fs';
import { config } from "dotenv";
config();
import { v1 as uuidv1 } from "uuid";
import 'reflect-metadata';
import { instanceToPlain } from "class-transformer";
import { disconnect } from "mongoose";
import * as path from 'path';
import DatabaseConnection from '../../../shared/databases.connection';
import TCRepository from '../../infrastructure/repository/tc.repository';
import ITCRepository from '../../domain/repository/Itc.repository';
import TC from '../../domain/tc';

export class InitLoad {
    
    readFile(namefile:string):any {
        const fileContents = fs.readFileSync(
          path.join(__dirname, namefile),
          {
            encoding: 'utf-8',
          },
        );
      return JSON.parse(fileContents);
    }

}

const load =new InitLoad();
const databaseConnection:DatabaseConnection = new DatabaseConnection();
const tcRepository: ITCRepository = new  TCRepository();
let resultJson:Record<string,any> = [];
( async () =>{
  await databaseConnection
  .mongooseDB(uuidv1())
  .then(async () => { 
    console.log('Connect to mongo-db');
    resultJson = load.readFile(process.env.FILENAME);
    const listTC:Array<Record<string, any>> = resultJson.results;
      for (let item of listTC){
        const tc:TC = new TC({card_number:item.card_number,
            cvv:item.cvv,
            email:item.email,
            expiration_month:item.expiration_month,
            expiration_year:item.expiration_year});
            const plain:Record<string,any> = instanceToPlain(tc);
            try{
              await tcRepository.create(plain);    
            } catch(e)  {
              console.error(e);
            }
      }
     
      console.log('Success load TC');
      disconnect();
    });
})();