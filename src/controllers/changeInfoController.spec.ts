import {SuccessResponse} from "../models/response/successResponse";
import * as Mocks from 'node-mocks-http';
import {ErrorResponse} from "../models/response/errorResponse";
import {Comment} from "../models/comment/comment";
import {InvalidInformation} from "../errors/validation/invalidInformation";
import {ChangeInfoController} from "./changeInfoController";
import {User} from "../models/user/user";
import {UserNotFound} from "../errors/userExistence/userNotFound";
import {InfoUpdateError} from "../errors/update/infoUpdateError";
import updateValidation from "../services/validations/updateValidation";
import {OldPasswordMismatch} from "../errors/update/oldPasswordMismatch";
import {PasswordChangeError} from "../errors/update/passwordChangeError";

describe('Change Info Controller Test' , () => {

    let changeInfoController: ChangeInfoController;

    beforeEach(() => {
        changeInfoController = new ChangeInfoController()
    });

    describe('getUser function' , () => {
        let validBody = {userId: '0'};
        let wrongBody = {userId: '-1'};
        let user: User = {
            userId: '0',
            name: 'hakan',
            surname: 'sivuk',
            gender: 'U',
            email: 'hakansivuk@gmail.com',
            password: 'hashed',
            token: null
        };
        describe('Success Response cases', () => {
            it('Response\'s status is 200', async() => {
                const req = Mocks.createRequest({body: validBody});
                const res = Mocks.createResponse();
                spyOn(changeInfoController.changeInfoBusiness, 'getUser').and.returnValue(Promise.resolve(new SuccessResponse(user)));
                await changeInfoController.getUser(req,res);
                expect(res.statusCode).toEqual(200);
            });
            it('Response\'s data is true', async() => {
                const req = Mocks.createRequest({body: validBody});
                const res = Mocks.createResponse();
                spyOn(changeInfoController.changeInfoBusiness, 'getUser').and.returnValue(Promise.resolve(new SuccessResponse(user)));
                await changeInfoController.getUser(req,res);
                expect(res._getData()).toEqual(new SuccessResponse(user));
            });
        });

        describe('Error Response cases', () => {
            it('Response\'s status is 404', async() => {
                const req = Mocks.createRequest({body: wrongBody});
                const res = Mocks.createResponse();
                spyOn(changeInfoController.changeInfoBusiness, 'getUser').and.returnValue(Promise.resolve(new ErrorResponse(new UserNotFound())));
                await changeInfoController.getUser(req,res);
                expect(res.statusCode).toEqual(404);
            });
            it('Response\'s status is 404', async() => {
                const req = Mocks.createRequest({body: {}});
                const res = Mocks.createResponse();
                spyOn(changeInfoController.changeInfoBusiness, 'getUser').and.returnValue(Promise.resolve(new ErrorResponse(new UserNotFound())));
                await changeInfoController.getUser(req,res);
                expect(res.statusCode).toEqual(404);
            });
        });
    });

    describe('updateUserInfo function' , () => {
        let validNewUser = {
            userId: '0',
            name: 'hakan',
            surname: 'sivuk',
            gender: 'U'
        };
        let wrongNameUser = {
            userId: '0',
            surname: 'sivuk',
            gender: 'U'
        };
        let wrongUserId = {
            userId: '-1',
            name: 'hakan',
            surname: 'sivuk',
            gender: 'U'
        };
        let savedUser: User = {
            userId: '0',
            name: 'hakan',
            surname: 'sivuk',
            gender: 'U',
            email: 'hakansivuk@gmail.com',
            password: 'hashed',
            token: null
        };
        describe('Success Response cases', () => {
            it('Response\'s status is 200', async() => {
                const req = Mocks.createRequest({body: validNewUser});
                const res = Mocks.createResponse();
                spyOn(changeInfoController.changeInfoBusiness, 'updateUserInfo').and.returnValue(Promise.resolve(new SuccessResponse(savedUser)));
                await changeInfoController.updateUserInfo(req,res);
                expect(res.statusCode).toEqual(200);
            });
            it('Response\'s data is true', async() => {
                const req = Mocks.createRequest({body: validNewUser});
                const res = Mocks.createResponse();
                spyOn(changeInfoController.changeInfoBusiness, 'updateUserInfo').and.returnValue(Promise.resolve(new SuccessResponse(savedUser)));
                await changeInfoController.updateUserInfo(req,res);
                expect(res._getData()).toEqual(new SuccessResponse(savedUser));
            });
        });

        describe('Error Response cases', () => {
            it('Response\'s status is 304', async() => {
                const req = Mocks.createRequest({body: wrongNameUser});
                const res = Mocks.createResponse();
                await changeInfoController.updateUserInfo(req,res);
                expect(res.statusCode).toEqual(304);
            });
            it('Response\'s status is 304', async() => {
                const req = Mocks.createRequest({body: wrongUserId});
                const res = Mocks.createResponse();
                spyOn(changeInfoController.changeInfoBusiness, 'updateUserInfo').and.returnValue(Promise.resolve(new ErrorResponse(new InfoUpdateError())));
                await changeInfoController.updateUserInfo(req,res);
                expect(res.statusCode).toEqual(304);
            });
        })
    });

    describe('changePassword function' , () => {
        let validBody = {
            userId: '0',
            oldPassword: 'Hakan123',
            password: 'Hakan1'
        };
        let wrongOldPassword = {
            userId: '0',
            oldPassword: 'Hakann123',
            password: 'Hakan1'
        };
        let wrongField = {
            userId: '0',
            password: 'Hakan1'
        };
        let wrongUserId = {
            userId: '-1',
            oldPassword: 'Hakan123',
            password: 'Hakan1'
        };
        let savedUser: User = {
            userId: '0',
            name: 'hakan',
            surname: 'sivuk',
            gender: 'U',
            email: 'hakansivuk@gmail.com',
            password: 'hashed',
            token: null
        };
        describe('Success Response cases', () => {
            it('Response\'s status is 200', async() => {
                const req = Mocks.createRequest({body: validBody});
                const res = Mocks.createResponse();
                spyOn(changeInfoController.changeInfoBusiness, 'changePassword').and.returnValue(Promise.resolve(new SuccessResponse(savedUser)));
                await changeInfoController.changePassword(req,res);
                expect(res.statusCode).toEqual(200);
            });
            it('Response\'s data is true', async() => {
                const req = Mocks.createRequest({body: validBody});
                const res = Mocks.createResponse();
                spyOn(changeInfoController.changeInfoBusiness, 'changePassword').and.returnValue(Promise.resolve(new SuccessResponse(savedUser)));
                await changeInfoController.changePassword(req,res);
                expect(res._getData()).toEqual(new SuccessResponse(savedUser));
            });
        });

        describe('Error Response cases', () => {
            it('Response\'s status is 400', async() => {
                const req = Mocks.createRequest({body: wrongField});
                const res = Mocks.createResponse();
                await changeInfoController.changePassword(req,res);
                expect(res.statusCode).toEqual(400);
            });
            it('Response\'s status is 400', async() => {
                const req = Mocks.createRequest({body: wrongOldPassword});
                const res = Mocks.createResponse();
                spyOn(changeInfoController.changeInfoBusiness, 'changePassword').and.returnValue(Promise.resolve(new ErrorResponse(new OldPasswordMismatch())));
                await changeInfoController.changePassword(req,res);
                expect(res.statusCode).toEqual(400);
            });
            it('Response\'s status is 500', async() => {
                const req = Mocks.createRequest({body: wrongUserId});
                const res = Mocks.createResponse();
                spyOn(changeInfoController.changeInfoBusiness, 'changePassword').and.returnValue(Promise.resolve(new ErrorResponse(new PasswordChangeError())));
                await changeInfoController.changePassword(req,res);
                expect(res.statusCode).toEqual(500);
            });
        })
    });
});