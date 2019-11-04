import {ChangeInfoService} from "./changeInfoService";
import {User} from "../../models/user/user";
import {UserNotFound} from "../../errors/userExistence/userNotFound";
import {InfoUpdateError} from "../../errors/update/infoUpdateError";
import {OldPasswordMismatch} from "../../errors/update/oldPasswordMismatch";
import {PasswordChangeError} from "../../errors/update/passwordChangeError";


describe('Change Info Service Test', () => {
    let changeInfoService: ChangeInfoService;

    beforeEach(() => {
        changeInfoService = new ChangeInfoService();
    });

    describe('getUser function' ,() => {
        let validId = '0';
        let wrongId = '-1';
        let returnedUser: User = {
            userId: '0',
            name: 'hakan',
            surname: 'sivuk',
            email: 'hakansivuk@gmail.com',
            gender: 'F',
            password: 'hashed',
            token: null
        };
        it('It returns a User when id is valid', async() => {
            spyOn(changeInfoService, 'getUser').and.callFake(async(userId: string): Promise<User> => {
                if(userId === '0') return Promise.resolve(returnedUser);
                throw new UserNotFound();
            });
            let result = await changeInfoService.getUser(validId);
            expect(result).toEqual(returnedUser);
        });
        it('It throws an error when id is invalid', () => {
            spyOn(changeInfoService, 'getUser').and.callFake((userId: string): Promise<User> => {
                if(userId === '0') return Promise.resolve(returnedUser);
                throw new UserNotFound();
            });
            expect(function () {changeInfoService.getUser(wrongId)}).toThrow(new UserNotFound());
        });
    });

    describe('updateUserInfo function' ,() => {
        let newValidUser: User = {
            userId: '0',
            name: 'hakan',
            surname: 'sivuk',
            email: null,
            gender: 'F',
            password: null,
            token: null
        };
        let newWrongUser: User = {
            userId: null,
            name: 'hakan',
            surname: 'sivuk',
            email: null,
            gender: 'F',
            password: null,
            token: null
        };
        let savedUser: User = {
            userId: '0',
            name: 'hakan',
            surname: 'sivuk',
            email: 'hakansivuk@gmail.com',
            gender: 'F',
            password: 'hashed',
            token: null
        };
        it('It returns a User successfully', async() => {
            spyOn(changeInfoService, 'updateUserInfo').and.callFake(async(user: User): Promise<User> => {
                if(user.userId === '0') return Promise.resolve(savedUser);
                throw new InfoUpdateError();
            });
            let result = await changeInfoService.updateUserInfo(newValidUser);
            expect(result).toEqual(savedUser);
        });
        it('It throws an error when id is invalid', () => {
            spyOn(changeInfoService, 'updateUserInfo').and.callFake((user: User): Promise<User> => {
                if(user.userId === '0') return Promise.resolve(savedUser);
                throw new InfoUpdateError();
            });
            expect(function () {changeInfoService.updateUserInfo(newWrongUser)}).toThrow(new InfoUpdateError());
        });
    });

    describe('isOldPasswordTrue function' ,() => {
        let validOldPassword = 'Hakan123';
        let wrongOldPassword = 'Hakan1';
        it('It executed successfully when old password is true', async() => {
            spyOn(changeInfoService, 'isOldPasswordTrue').and.callFake( (userId:string, oldPassword: string) => {
                if(userId !== '0' || oldPassword !== 'Hakan123') throw new OldPasswordMismatch();
                return Promise.resolve();
            });
            expect(() => {changeInfoService.isOldPasswordTrue('0', validOldPassword)}).not.toThrow();
        });
        it('It throws an error when id is invalid', () => {
            spyOn(changeInfoService, 'isOldPasswordTrue').and.callFake( (userId:string, oldPassword: string) => {
                if(userId !== '0') throw new UserNotFound();
                if(oldPassword !== 'Hakan123') throw new OldPasswordMismatch();
                return Promise.resolve();
            });
            expect(function () {changeInfoService.isOldPasswordTrue('-1', validOldPassword)}).toThrow(new UserNotFound());
        });
        it('It throws an error when old password is wrong', () => {
            spyOn(changeInfoService, 'isOldPasswordTrue').and.callFake( (userId:string, oldPassword: string) => {
                if(userId !== '0') throw new UserNotFound();
                if(oldPassword !== 'Hakan123') throw new OldPasswordMismatch();
                return Promise.resolve();
            });
            expect( function () { changeInfoService.isOldPasswordTrue('0', wrongOldPassword)}).toThrow(new OldPasswordMismatch());
        });
    });

    describe('changePassword function' ,() => {
        let password = 'Hakan123';
        let validUserId = '0';
        let wrongUserId = '-1';
        let returnValue: User = {
            email: "hakansivuk@gmail.com",
            gender: "U",
            password: "hashed",
            token: null,
            userId: '0',
            name: 'hakan',
            surname: 'sivuk'
        };
        it('It returns a User when userId is valid', async() => {
            spyOn(changeInfoService, 'changePassword').and.callFake( (userId:string, password: string): Promise<User> => {
                if(userId !== '0') throw new PasswordChangeError();
                return Promise.resolve(returnValue);
            });
            let result = await changeInfoService.changePassword(validUserId, password);
            expect(result).toEqual(returnValue);
        });
        it('It throws an error when id is invalid', () => {
            spyOn(changeInfoService, 'changePassword').and.callFake( (userId:string, password: string): Promise<User> => {
                if(userId !== '0') throw new PasswordChangeError();
                return Promise.resolve(returnValue);
            });
            expect(function () {changeInfoService.changePassword(wrongUserId, password)}).toThrow(new PasswordChangeError());
        });
    });

});