import {LoginService} from "./loginService";
import {User} from "../../models/user/user";
import {WrongPasswordOrEmail} from "../../errors/update/wrongPasswordOrEmail";


describe('LoginService test', () => {

    let loginService:LoginService;

    beforeAll(() => {
       loginService = new LoginService();
    });

    describe('login function', () => {

        let user:User = {userId:'mockuser',name:'harun',
            surname:'sasmaz',gender:'M',email:'test@test.com',password:'hashed',token:'token'};

        describe('when correct email and password is given', () => {
            it('should return user data', async function () {
                spyOn(loginService,'login').and.returnValue(Promise.resolve(user));
                let result = await loginService.login('test@test.com', 'test');
                expect(result).toEqual(user);
            });
        });

        describe('when incorrect email is given', () => {

            it('should throw wrong email or password error', async function () {
                spyOn(loginService,'login').and.callFake((email:string, password:string) => {
                    if(email !== 'test@test.com' || password !== 'test')
                        throw new WrongPasswordOrEmail();
                    return Promise.resolve(user);
                });
                expect(function () { loginService.login('wrong@test.com','test')})
                    .toThrow(new WrongPasswordOrEmail());
            });
        });

        describe('when incorrect password is given', () => {

            it('should throw wrong email or password error', async function () {
                spyOn(loginService,'login').and.callFake((email:string, password:string) => {
                    if(email !== 'test@test.com' || password !== 'test')
                        throw new WrongPasswordOrEmail();
                    return Promise.resolve(user);
                });
                expect(function () { loginService.login('test@test.com','wrong')})
                    .toThrow(new WrongPasswordOrEmail());
            });
        });
    });
});
