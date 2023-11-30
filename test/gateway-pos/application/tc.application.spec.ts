import chai from "chai";
const { expect: expect_chai } = chai;
import { v1 as uuidv1 } from "uuid";
import TCApplication from '../../../src/gateway-pos/application/tc.case.application'
import TCRepository from '../../../src/gateway-pos/infrastructure/repository/tc.repository'
import TokenRepository from '../../../src/gateway-pos/infrastructure/repository/token.repository'
import ITCRepository from "../../../src/gateway-pos/domain/repository/Itc.repository";
import ITokenRepository from "../../../src/gateway-pos/domain/repository/Itoken.repository";

test('Test valid getTC --success', async () => {
    const instanceTcRepository:ITCRepository = new TCRepository();
    const instanceTokenRepository:ITokenRepository = new TokenRepository();

   jest.spyOn(instanceTcRepository, 'find').mockImplementation((card_number:string) => {
            return new Promise((resolve,reject)=>{
                const data = {email: 'juaquin.ramirez@gcp.cl',
                card_number: '4194651076047636',
                cvv: '849',
                expiration_year: '2034',
                expiration_month: '01'};
                resolve(data);
            });
        }
    );

    jest.spyOn(instanceTokenRepository, 'find').mockImplementation((card_number:string) => {
        return new Promise((resolve,reject)=>{
            const data = {"token":"V9EIUQE7C8SJ39G7",
            "data":"U2FsdGVkX19QwndSj177VPqRMcvh4OcJWhjFAzAVNo8+yy7+ddTd8nSI5i4xi6ZI",
            "expiration_date":"2023-11-27T06:36:03.859Z"};
            resolve(data);
        });
    }
    );

   jest.spyOn(instanceTcRepository, 'exists').mockImplementation((card_number:string) => {
        return new Promise((resolve,reject)=>{
            const data = 1;
            resolve(data);
        });
    }
    );

    
    const tcApplication = new TCApplication(instanceTcRepository,instanceTokenRepository);    
    const headers = {"x-gateway-pos-key":"pk_test_dsfefefe3454545",
    "authorization":"Bearer V9EIUQE7C8SJ39G7",
    "connection":"keep-alive"};
    const result = await tcApplication.getTC(headers,uuidv1());
    expect_chai(result).to.be.a("Object");
    
});

test('Test valid getTC --fail', async () => {
    const instanceTcRepository:ITCRepository = new TCRepository();
    const instanceTokenRepository:ITokenRepository = new TokenRepository();

   jest.spyOn(instanceTcRepository, 'find').mockImplementation((card_number:string) => {
            return new Promise((resolve,reject)=>{
                const data = {email: 'juaquin.ramirez@gcp.cl',
                card_number: '4194651076047636',
                cvv: '849',
                expiration_year: '2034',
                expiration_month: '01'};
                resolve(data);
            });
        }
    );

    jest.spyOn(instanceTokenRepository, 'find').mockImplementation((card_number:string) => {
        return new Promise((resolve,reject)=>{
            const data = {"token":"V9EIUQE7C8SJ39G7",
            "data":"U2FsdGVkX19QwndSj177VPqRMcvh4OcJWhjFAzAVNo8+yy7+ddTd8nSI5i4xi6ZI",
            "expiration_date":"2023-11-27T06:36:03.859Z"};
            resolve(data);
        });
    }
    );

   jest.spyOn(instanceTcRepository, 'exists').mockImplementation((card_number:string) => {
        return new Promise((resolve,reject)=>{
            const data = 1;
            resolve(data);
        });
    }
    );

    
    const tcApplication = new TCApplication(instanceTcRepository,instanceTokenRepository);    
    const headers = {"x-gateway-pos-key":"_test_dsfefefe3454545",
    "authorization":"Bearer V9EIUQE7C8SJ39G7",
    "connection":"keep-alive"};
    try{
        await tcApplication.getTC(headers,uuidv1());
    } catch(err)
    {
        expect_chai(err).to.be.a("Error");

    }
    
});

test('Test valid signTC --success', async () => {
    const instanceTcRepository:ITCRepository = new TCRepository();
    const instanceTokenRepository:ITokenRepository = new TokenRepository();

   jest.spyOn(instanceTcRepository, 'exists').mockImplementation((card_number:string) => {
        return new Promise((resolve,reject)=>{
            const data = 1;
            resolve(data);
        });
    }
    );

    jest.spyOn(instanceTokenRepository, 'create').mockImplementation((param:Record<string,any>) => {
        return new Promise((resolve,reject)=>{
            const data = {"token":"V9EIUQE7C8SJ39G7",
            "data":"U2FsdGVkX19QwndSj177VPqRMcvh4OcJWhjFAzAVNo8+yy7+ddTd8nSI5i4xi6ZI",
            "expiration_date":"2023-11-27T06:36:03.859Z"};
            resolve(data);
        });
    }
    );

    
    const tcApplication = new TCApplication(instanceTcRepository,instanceTokenRepository);    
    const body = {
        "email":"jhernandezloya@gmail.com",
        "card_number":"4964028592904269",
        "cvv":"123",
        "expiration_year": "2025",
        "expiration_month": "09"
    };
    const result = await tcApplication.signTC(body,uuidv1());
    expect_chai(result).to.be.a("Object");
    
});

test('Test valid signTC -- fail', async () => {
    const instanceTcRepository:ITCRepository = new TCRepository();
    const instanceTokenRepository:ITokenRepository = new TokenRepository();

   jest.spyOn(instanceTcRepository, 'exists').mockImplementation((card_number:string) => {
        return new Promise((resolve,reject)=>{
            const data = 1;
            resolve(data);
        });
    }
    );

    jest.spyOn(instanceTokenRepository, 'create').mockImplementation((param:Record<string,any>) => {
        return new Promise((resolve,reject)=>{
            const data = {"token":"V9EIUQE7C8SJ39G7",
            "data":"U2FsdGVkX19QwndSj177VPqRMcvh4OcJWhjFAzAVNo8+yy7+ddTd8nSI5i4xi6ZI",
            "expiration_date":"2023-11-27T06:36:03.859Z"};
            resolve(data);
        });
    }
    );

    
    const tcApplication = new TCApplication(instanceTcRepository,instanceTokenRepository);    
    const body = {
        "email":"jhernandezloya@gmail.com",
        "card_number":"1164028592904269",
        "cvv":"123",
        "expiration_year": "2025",
        "expiration_month": "09"
    };
    try{
        await tcApplication.signTC(body,uuidv1());

    } catch(err)
    {
        expect_chai(err).to.be.a("Error");
    }
    
});