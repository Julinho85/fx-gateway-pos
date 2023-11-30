import chai from "chai";
const { expect } = chai;
import TC from '../../../src/gateway-pos/domain/tc'

describe("TC Valid" ,()=> {
  test('Test valid Object', () => {
      expect(new TC({card_number:'4964028592904269',
      cvv:'849',email:'maximiliano@gcp.cl',expiration_month:'01',
      expiration_year:'2034'})).to.be.a("Object");
    });
});

describe("Invalid card_number" ,()=> {
  test('Test Invalid card_number', () => {
    try {
      new TC({card_number:'1164028592904269',
      cvv:'849',email:'maximiliano@gcp.cl',expiration_month:'01',
      expiration_year:'2034'});
    } catch(err){
      expect(err).to.be.a("Error");
    }
  });
});

describe("Invalid expiration_month" ,()=> {
  test('Test Invalid expiration_month', () => {
    try {
      new TC({card_number:'4964028592904269',
      cvv:'849',email:'maximiliano@gcp.cl',expiration_month:'',
      expiration_year:'2034'});
    } catch(err){
      expect(err).to.be.a("Error");
    }
  });
});

describe("Invalid card_number" ,()=> {
  test('Test Invalid card_number', () => {
    try {
      new TC({card_number:'1164028592904269',
      cvv:'849',email:'maximiliano@gcp.cl',expiration_month:'01',
      expiration_year:'2034'});
    } catch(err){
      expect(err).to.be.a("Error");
    }
  });
});

describe("Email fail" ,()=> {
  test('Test Invalid Email fail', () => {
    try {
      new TC({card_number:'4964028592904269',
      cvv:'849',email:'maximiliano@.cl',expiration_month:'01',
      expiration_year:'2034'});
    } catch(err){
      expect(err).to.be.a("Error");
    }
  });
});
