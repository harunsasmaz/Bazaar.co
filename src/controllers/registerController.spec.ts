import {RegisterController} from "./registerController";
import {User} from "../models/user/user";
import * as Mocks from "node-mocks-http";
import {SuccessResponse} from "../models/response/successResponse";
import {ErrorResponse} from "../models/response/errorResponse";
import {ExistingEmail} from "../errors/userExistence/existingEmail";
import {InvalidInformation} from "../errors/validation/invalidInformation";


describe('RegisterController Test', () => {

    let registerController,req,res;

    beforeAll(() => {
        registerController = new RegisterController();
    });

    describe('addNewUser function', () => {

        describe('when a valid body is given', () => {
            const expected: User = {userId:'test', name:'test', surname:'test',
                gender:'U',  email: 'test@test.com', password: 'Test123', token:null};

            beforeEach(() => {
                req = Mocks.createRequest({ body: { name:'test', surname:'test', gender:'U',
                        email: 'test@test.com', password: 'Test123'}});
                res = Mocks.createResponse();
            });

            it('should respond user data', async function () {
                spyOn(registerController.registerBusiness,'register').and.returnValue(Promise.resolve(new SuccessResponse(expected)));
                await registerController.addNewUser(req,res);
                expect(res._getData()).toEqual(new SuccessResponse(expected));
            });
            it('should have status 200', async function () {
                spyOn(registerController.registerBusiness,'register').and.returnValue(Promise.resolve(new SuccessResponse(expected)));
                await registerController.addNewUser(req,res);
                expect(res.statusCode).toEqual(200);
            });
        });

        describe('when an existing email is given', () => {
            beforeEach(() => {
                req = Mocks.createRequest({ body: { name:'test', surname:'test', gender:'U',
                        email: 'existing@test.com', password: 'Test123'}});
                res = Mocks.createResponse();
            });

            it('should respond with existing email error', async function () {
                spyOn(registerController.registerBusiness,'register').and.returnValue(Promise.resolve(new ErrorResponse(new ExistingEmail())));
                await registerController.addNewUser(req,res);
                expect(res._getData()).toEqual(new ErrorResponse(new ExistingEmail()));
            });

            it('should have status 400', async function () {
                spyOn(registerController.registerBusiness,'register').and.returnValue(Promise.resolve(new ErrorResponse(new ExistingEmail())));
                await registerController.addNewUser(req,res);
                expect(res.statusCode).toEqual(400);
            });
        });

        describe('when invalid body is given', () => {
            beforeEach(() => { // email field is lost for some reason
                req = Mocks.createRequest({ body: { name:'test', surname:'test', gender:'U',
                       password: 'Test123'}});
                res = Mocks.createResponse();
            });

            it('should respond with invalid information error', async function () {
                await registerController.addNewUser(req,res);
                expect(res._getData()).toEqual(new ErrorResponse(new InvalidInformation()));
            });

            it('should have status 400', async function () {
                await registerController.addNewUser(req,res);
                expect(res.statusCode).toEqual(400);
            });
        });
    });
});

