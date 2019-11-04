import {LoginController} from "./loginController";
import * as Mocks from 'node-mocks-http';
import {SuccessResponse} from "../models/response/successResponse";
import {User} from "../models/user/user";
import {WrongPasswordOrEmail} from "../errors/update/wrongPasswordOrEmail";
import {ErrorResponse} from "../models/response/errorResponse";
import {InvalidInformation} from "../errors/validation/invalidInformation";


describe('LoginController Test', () => {

    let loginController:LoginController,req,res;

    beforeAll(() => {
        loginController = new LoginController();
    });

    describe('login function', () => {
        describe('when correct email and password given', () => {
            const expected: User = {userId:'test', name:'test', surname:'test',
                gender:'U',  email: 'test@test.com', password: 'Test123', token:'token'};

            beforeEach(() => {
                req = Mocks.createRequest({ body: { email: 'test@test.com', password: 'Test123'}});
                res = Mocks.createResponse();
            });

            it('should respond user data', async function () {
                spyOn(loginController.loginBusiness, 'login').and.returnValue(Promise.resolve(new SuccessResponse(expected)));
                await loginController.login(req,res);
                expect(res._getData()).toEqual(new SuccessResponse(expected));
            });
        });

        describe('when email or password is wrong',() => {

            beforeEach(() => {
                req = Mocks.createRequest({ body: { email: 'notexist@test.com', password: 'Test123'}});
                res = Mocks.createResponse();
            });

            it('should send wrong email or password error response', async function () {
                spyOn(loginController.loginBusiness, 'login').and.returnValue(Promise.resolve(new ErrorResponse(new WrongPasswordOrEmail())));
                await loginController.login(req,res);
                expect(res._getData()).toEqual(new ErrorResponse(new WrongPasswordOrEmail()));
            });
            it('should have status 404', async function () {
                spyOn(loginController.loginBusiness, 'login').and.returnValue(Promise.resolve(new ErrorResponse(new WrongPasswordOrEmail())));
                await loginController.login(req,res);
                expect(res.statusCode).toEqual(404);
            });
        });

        describe('when invalid body is given', () => {

            beforeEach(() => { // password is missing
                req = Mocks.createRequest({ body: { email: 'notexist@test.com' }});
                res = Mocks.createResponse();
            });

            it('should send invalid information error response', async function () {
                await loginController.login(req,res);
                expect(res._getData()).toEqual(new ErrorResponse(new InvalidInformation()));
            });
            it('should have status 400', async function () {
                await loginController.login(req,res);
                expect(res.statusCode).toEqual(400);
            });
        });
    });
});
