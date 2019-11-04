import {ChangeInfoBusiness} from "./changeInfoBusiness";
import {User} from "../models/user/user";
import {SuccessResponse} from "../models/response/successResponse";
import {ResponseModel} from "../models/response/responseModel";
import {UserNotFound} from "../errors/userExistence/userNotFound";
import {ErrorResponse} from "../models/response/errorResponse";
import {InfoUpdateError} from "../errors/update/infoUpdateError";
import {OldPasswordMismatch} from "../errors/update/oldPasswordMismatch";
import {PasswordChangeError} from "../errors/update/passwordChangeError";


describe('Change Info Business Test', () => {
    let changeInfoBusiness: ChangeInfoBusiness;

    beforeEach(() => {
        changeInfoBusiness = new ChangeInfoBusiness();
    });

    describe('getUser function', () => {
        let validUserId = 'hakan';
        let wrongUserId = 'hakann';
        let expectedUser: User = {
            userId: 'hakan',
            name: 'Hakan',
            surname: 'Sivuk',
            gender: 'F',
            email: 'hakansivuk@gmail.com',
            password: 'hashedPassword',
            token: 'token'
        };
        describe('SuccessResponse cases', () => {
            it('Returned value is SuccessResponse', async() => {
                spyOn(changeInfoBusiness.changeInfoService, 'getUser').and.returnValue(Promise.resolve(expectedUser));
                let result: ResponseModel = await changeInfoBusiness.getUser(validUserId);
                expect(result instanceof SuccessResponse).toEqual(true);
            });
            it('Response\'s status is 200', async() => {
                spyOn(changeInfoBusiness.changeInfoService, 'getUser').and.returnValue(Promise.resolve(expectedUser));
                let result: ResponseModel = await changeInfoBusiness.getUser(validUserId);
                expect(result.status).toEqual(200);
            });
            it('Response\'s data is true', async() => {
                spyOn(changeInfoBusiness.changeInfoService, 'getUser').and.returnValue(Promise.resolve(expectedUser));
                let result: ResponseModel = await changeInfoBusiness.getUser(validUserId);
                expect(result.data).toEqual(expectedUser);
            });
        });

        describe('ErrorResponse cases', () => {
            it('Returned value is ErrorResponse', async() => {
                spyOn(changeInfoBusiness.changeInfoService, 'getUser').and.callFake((userId: string) => {
                    throw new UserNotFound();
                });
                let result: ResponseModel = await changeInfoBusiness.getUser(wrongUserId);
                expect(result instanceof ErrorResponse).toEqual(true);
            });
            it('Response\'s status is 404', async() => {
                spyOn(changeInfoBusiness.changeInfoService, 'getUser').and.callFake((userId: string) => {
                    throw new UserNotFound();
                });
                let result: ResponseModel = await changeInfoBusiness.getUser(wrongUserId);
                expect(result.status).toEqual(404);
            });
        });

    });

    describe('updateUserInfo function', () => {
        let newUser: User = {
            userId: 'hakan',
            name: 'Hakan',
            surname: 'Sivuk',
            gender: 'F',
            email: 'hakansivuk@gmail.com',
            password: 'hashedPassword',
            token: 'token'
        };
        let wrongUser: User = {
            userId: null,
            name: 'Hakan',
            surname: 'Sivuk',
            gender: 'F',
            email: 'hakansivuk@gmail.com',
            password: 'hashedPassword',
            token: 'token'
        };
        let expectedUser: User = {
            userId: 'hakan',
            name: 'Hakan',
            surname: 'Sivuk',
            gender: 'F',
            email: 'hakansivuk@gmail.com',
            password: 'hashedPassword',
            token: 'token'
        };

        describe('SuccessResponse cases', () => {
           it('Returned value is SuccessResponse', async() => {
               spyOn(changeInfoBusiness.changeInfoService, 'updateUserInfo').and.returnValue(Promise.resolve(expectedUser));
               let result = await changeInfoBusiness.updateUserInfo(newUser);
               expect(result instanceof SuccessResponse).toEqual(true);
           });
           it('Response\'s status is 200', async() => {
               spyOn(changeInfoBusiness.changeInfoService, 'updateUserInfo').and.returnValue(Promise.resolve(expectedUser));
               let result = await changeInfoBusiness.updateUserInfo(newUser);
               expect(result.status).toEqual(200);
           });
           it('Response\'s data is true', async() => {
               spyOn(changeInfoBusiness.changeInfoService, 'updateUserInfo').and.returnValue(Promise.resolve(expectedUser));
               let result = await changeInfoBusiness.updateUserInfo(newUser);
               expect(result.data).toEqual(expectedUser);
           });
        });

        describe('ErrorResponse cases', () => {
            it('Returned value is ErrorResponse', async() => {
                spyOn(changeInfoBusiness.changeInfoService, 'updateUserInfo').and.callFake((user: User) => {
                    throw new InfoUpdateError();
                });
                let result = await changeInfoBusiness.updateUserInfo(wrongUser);
                expect(result instanceof ErrorResponse).toEqual(true);
            });
            it('Response\'s status is 304', async() => {
                spyOn(changeInfoBusiness.changeInfoService, 'updateUserInfo').and.callFake((user: User) => {
                    throw new InfoUpdateError();
                });
                let result = await changeInfoBusiness.updateUserInfo(wrongUser);
                expect(result.status).toEqual(304);
            });
        });
    });

    describe('changePassword function', () => {
        let validPassword = 'Hakan123';
        let wrongPassword = 'hakan1';
        let newPassword = 'Hakan1';
        let validUserId = 'hakan';
        let wrongUserId = 'hakann';
        let expectedUser: User = {
            userId: 'hakan',
            name: 'Hakan',
            surname: 'Sivuk',
            gender: 'F',
            email: 'hakansivuk@gmail.com',
            password: 'hashedPassword',
            token: 'token'
        };

        describe('SuccessResponse cases', () => {
            it('Returned value is SuccessResponse', async() => {
                spyOn(changeInfoBusiness.changeInfoService, 'isOldPasswordTrue');
                spyOn(changeInfoBusiness.changeInfoService, 'changePassword').and.returnValue(Promise.resolve(expectedUser));
                let result: ResponseModel = await changeInfoBusiness.changePassword(validUserId, validPassword, newPassword);
                expect(result instanceof SuccessResponse).toEqual(true);
            });
            it('Response\'s status is 200', async() => {
                spyOn(changeInfoBusiness.changeInfoService, 'isOldPasswordTrue');
                spyOn(changeInfoBusiness.changeInfoService, 'changePassword').and.returnValue(Promise.resolve(expectedUser));
                let result: ResponseModel = await changeInfoBusiness.changePassword(validUserId, validPassword, newPassword);
                expect(result.status).toEqual(200);
            });
            it('Response\'s data is true', async() => {
                spyOn(changeInfoBusiness.changeInfoService, 'isOldPasswordTrue');
                spyOn(changeInfoBusiness.changeInfoService, 'changePassword').and.returnValue(Promise.resolve(expectedUser));
                let result: ResponseModel = await changeInfoBusiness.changePassword(validUserId, validPassword, newPassword);
                expect(result.data).toEqual(expectedUser);
            });
        });

        describe('ErrorResponse cases', () => {
            it('Returned value is ErrorResponse', async() => {
                spyOn(changeInfoBusiness.changeInfoService, 'isOldPasswordTrue').and.callFake(() => {
                    throw new OldPasswordMismatch();
                });
                let result: ResponseModel = await changeInfoBusiness.changePassword(validUserId, wrongPassword, newPassword);
                expect(result instanceof ErrorResponse).toEqual(true);
            });
            it('Response\'s status is 400', async() => {
                spyOn(changeInfoBusiness.changeInfoService, 'isOldPasswordTrue').and.callFake(() => {
                    throw new OldPasswordMismatch();
                });
                let result: ResponseModel = await changeInfoBusiness.changePassword(validUserId, validPassword, newPassword);
                expect(result.status).toEqual(400);
            });
            it('Returned value is ErrorResponse', async() => {
                spyOn(changeInfoBusiness.changeInfoService, 'isOldPasswordTrue');
                spyOn(changeInfoBusiness.changeInfoService, 'changePassword').and.callFake((wrongUserId, newPassword) => {
                    throw new PasswordChangeError();
                });
                let result: ResponseModel = await changeInfoBusiness.changePassword(validUserId, validPassword, newPassword);
                expect(result instanceof ErrorResponse).toEqual(true);
            });
            it('Returned value is ErrorResponse', async() => {
                spyOn(changeInfoBusiness.changeInfoService, 'isOldPasswordTrue');
                spyOn(changeInfoBusiness.changeInfoService, 'changePassword').and.callFake((wrongUserId, newPassword) => {
                    throw new PasswordChangeError();
                });
                let result: ResponseModel = await changeInfoBusiness.changePassword(validUserId, validPassword, newPassword);
                expect(result.status).toEqual(500);
            });
        });
    });
});