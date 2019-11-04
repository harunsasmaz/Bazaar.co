import {LoginBusiness} from "./loginBusiness";
import {User} from "../models/user/user";
import {SuccessResponse} from "../models/response/successResponse";
import {WrongPasswordOrEmail} from "../errors/update/wrongPasswordOrEmail";
import {ErrorResponse} from "../models/response/errorResponse";


describe('LoginBusiness Test', ()=> {

    let loginBusiness: LoginBusiness;

    beforeEach(()=> {
        loginBusiness = new LoginBusiness();
    });

    describe('login function',  ()=> {

        describe('successfully login', () => {
            let user:Promise<User> = Promise.resolve<User>({userId:'mockuser',name:'harun',
                surname:'sasmaz',gender:'M',email:'exist@exist.com',password:'hashed',token:'token'});

            it('should send success response', async () => {
                spyOn(loginBusiness.loginService, 'login').and.callFake(() => { return user });
                let result = await loginBusiness.login('exist@exist.com','hashed');
                expect(result instanceof SuccessResponse).toEqual(true);
            });
        });

        describe('with wrong email', () => {
            it('should send wrong email or password error', async () => {
                spyOn(loginBusiness.loginService, 'login').and.callFake(() => { throw new WrongPasswordOrEmail()});
                let result = await loginBusiness.login('notexist@exist.com','hashed');
                expect(result instanceof ErrorResponse).toEqual(true);
            });
        });

        describe('with wrong password', () => {
            it('should send wrong email or password error', async () => {
                spyOn(loginBusiness.loginService, 'login').and.callFake(() => { throw new WrongPasswordOrEmail()});
                let result = await loginBusiness.login('exist@exist.com','notCorrectPassword');
                expect(result instanceof ErrorResponse).toEqual(true);
            });
        });

    })
    

});
