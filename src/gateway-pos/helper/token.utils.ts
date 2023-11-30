import { SECRET_CRYPTO } from '../../shared/constants';
import CryptoJS from "crypto-js";

export default class TokenHelp {

    public static generateToken() : string {
        const characters:string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const tokenLength:number = 16;
      
        let token:string = '';
        for (let i = 0; i < tokenLength; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          token += characters[randomIndex];
        }
      
        return token;
      }

      public static decryptdata(card_number: string):string {
        try{
          const bytes  = CryptoJS.AES.decrypt(card_number, SECRET_CRYPTO);
          const ciphercard_number:string = bytes.toString(CryptoJS.enc.Utf8);
          return ciphercard_number;
        } catch(err){
          throw new Error('error en la desencriptacion');
        }
     }

     public static encryptdata(card_number: string) {
      const ciphercard_number  = CryptoJS.AES.encrypt(card_number, SECRET_CRYPTO).toString();
      return ciphercard_number;
    }

  }
  