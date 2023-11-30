import chai from "chai";
const { expect: expect_chai } = chai;
import { v1 as uuidv1 } from "uuid";
import TokenApplication from '../../../src/gateway-pos/application/token.case.application'
import TCRepository from '../../../src/gateway-pos/infrastructure/repository/tc.repository'
import TokenRepository from '../../../src/gateway-pos/infrastructure/repository/token.repository'
import ITCRepository from "../../../src/gateway-pos/domain/repository/Itc.repository";
import ITokenRepository from "../../../src/gateway-pos/domain/repository/Itoken.repository";

test('Test valid validToken --success', async () => {
    const instanceTokenRepository:ITokenRepository = new TokenRepository();

    jest.spyOn(instanceTokenRepository, 'find').mockImplementation((card_number:string) => {
        return new Promise((resolve,reject)=>{
            const data = {"token":"V9EIUQE7C8SJ39G7",
            "data":"U2FsdGVkX19QwndSj177VPqRMcvh4OcJWhjFAzAVNo8+yy7+ddTd8nSI5i4xi6ZI",
            "expiration_date":"2043-11-27T06:36:03.859Z"};
            resolve(data);
        });
    }
    );

    
    const tokenApplication = new TokenApplication(instanceTokenRepository);    
    const headers = {"x-gateway-pos-key":"pk_test_dsfefefe3454545",
    "authorization":"Bearer V9EIUQE7C8SJ39G7",
    "connection":"keep-alive"};
    expect_chai(await tokenApplication.validateToken(headers,uuidv1())).to.be.a('undefined');
    
});

test('Test valid validToken --fail', async () => {
    const instanceTokenRepository:ITokenRepository = new TokenRepository();

    jest.spyOn(instanceTokenRepository, 'find').mockImplementation((card_number:string) => {
        return new Promise((resolve,reject)=>{
            const data = {"token":"V9EIUQE7C8SJ39G7",
            "data":"U2FsdGVkX19QwndSj177VPqRMcvh4OcJWhjFAzAVNo8+yy7+ddTd8nSI5i4xi6ZI",
            "expiration_date":"2023-11-27T06:36:03.859Z"};
            resolve(data);
        });
    }
    );

    
    const tokenApplication = new TokenApplication(instanceTokenRepository);    
    const headers = {"x-gateway-pos-key":"rr_test_dsfefefe3454545",
    "authorization":"Bearer V9EIUQE7C8SJ39G7",
    "connection":"keep-alive"};
    try{
        await tokenApplication.validateToken(headers,uuidv1());
    } catch(err)
    {
        expect_chai(err).to.be.a("Error");

    }
});