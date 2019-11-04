import * as Mocks from 'node-mocks-http';
import commentEditValidation from './commentEditValidation';
import {InvalidInformation} from "../../errors/validation/invalidInformation";
import loginValidation from "./loginValidation";

describe('Login Validation Test' , () => {

    describe('check function' , () => {
        let validBody = {
            email: 'hakansivuk@gmail.com',
            password: 'Hakan123'
        };
        let invalidPassword = {
            email: 'hakansivuk@gmail.com'
        };
        let invalidEmail = {
            email: 'hakansivuk',
            password: 'Hakan123'
        };
        it('It is executed successfully when request is in true form', () => {
            const req = Mocks.createRequest({body: validBody});
            loginValidation.check(req);
        });
        it('It throws an error when body is in wrong form', () => {
            const req = Mocks.createRequest({body: invalidPassword});
            expect(function(){loginValidation.check(req)}).toThrow(new InvalidInformation());
        });
        it('It throws an error when body is in wrong form', () => {
            const req = Mocks.createRequest({body: invalidEmail});
            expect(function(){loginValidation.check(req)}).toThrow(new InvalidInformation());
        });
    });

});