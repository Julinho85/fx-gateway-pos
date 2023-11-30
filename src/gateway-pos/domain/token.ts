import { Expose } from 'class-transformer';

export default class Token {

  @Expose({ name: 'token' })
  private _token: string;
  @Expose({ name: 'data' })
  private _data: string;
  @Expose({ name: 'expiration_date' })
  private _expiration_date: string;

  /**
     * Getter $data
     * @return {string}
     */
    public get data(): string {
      return this._data;
    }

    /**
     * Getter expiration_date
     * @return {string}
     */
	public get expiration_date(): string {
		return this._expiration_date;
	}

    /**
     * Getter token
     * @return {string}
     */
	public get token(): string {
		return this._token;
	}
  
  constructor({
    token,
    data,
    expiration_date
  }: {
    token:string,
    data: string;
    expiration_date: string;
  }) {
    this._token = token;
    this._data = data;
    this._expiration_date = expiration_date;
  }
  

}