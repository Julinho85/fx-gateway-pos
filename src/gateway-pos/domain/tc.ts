import { Expose } from 'class-transformer';
import {isEmail} from 'validator/validator';
import Luhn from 'luhn-js';

export default class TC {
  @Expose({ name: 'email' })
  private _email: string;
  @Expose({ name: 'card_number' })
  private _card_number: string;
  @Expose({ name: 'cvv' })
  private _cvv: string;
  @Expose({ name: 'expiration_year' })
  private _expiration_year: string;
  @Expose({ name: 'expiration_month' })
  private _expiration_month: string;
  
  constructor({
    email,
    card_number,
    cvv,
    expiration_year,
    expiration_month
  }: {
    email:string,
    card_number: string;
    cvv: string;
    expiration_year: string;
    expiration_month:string;
  }) {
    this._email = this.validateEmail(email);
    this._card_number = this.validateTC(card_number);
    this._cvv = this.validateIsNumber(cvv,'No es valido el CVV');
    this._expiration_year = this.validateIsNumber(expiration_year,'No es valido el año');
    this._expiration_month = this.validateIsNumber(expiration_month,'No es valido el año');
  }
  
  private validateEmail(email:string): string {
    if(!isEmail(email)) {
        throw new Error('Email no valido');
    } else {
      return email;
    }
  }

  private validateTC(card_number:string): string {
    if(!Luhn.isValid(card_number)) {
        throw new Error('Numero de tarjeta no valido');
    } else {
      return card_number;
    }
  }

  private validateIsNumber(value:string,message:string): string {
    try{
      parseInt(value)
    }catch(err){
      throw new Error(message);
    }
    return value;
  }
  
  public get email(): string {
    return this._email;
	}
  
  public get card_number(): string {
    return this._card_number;
  }
  public get cvv(): string {
    return this._cvv;
  }
  public get expiration_year(): string {
    return this._expiration_year;
  }
  public get expiration_month(): string {
    return this._expiration_month;
  }
}