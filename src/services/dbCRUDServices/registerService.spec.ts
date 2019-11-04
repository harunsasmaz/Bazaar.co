import {RegisterService} from "./registerService";
import {User} from "../../models/user/user";
import {ExistingEmail} from "../../errors/userExistence/existingEmail";
import {RegistrationError} from "../../errors/register/registrationError";


describe('RegisterService Test', () => {
    let registerService: RegisterService;

    beforeAll(() => {
       registerService = new RegisterService();
    });

    describe('register function', () =>{
        let user:User = {userId:'mockuser',name:'harun',
            surname:'sasmaz',gender:'M',email:'test@test.com',password:'hashed',token:null};
        describe('when a valid information is given', () => {
            let body:User = {userId: null, name:'harun',
                surname:'sasmaz',gender:'M',email:'test@test.com',password:'test', token: null};
            it('should return user data', async function () {
                spyOn(registerService, 'register').and.returnValue(Promise.resolve(user));
                let result = await registerService.register(body);
                expect(result).toEqual(user);
            });
        });

        describe('when an existing email is given', () => {
            let body:User = {userId: null, name:'harun',
                surname:'sasmaz',gender:'M',email:'existing@test.com',password:'test', token: null};

            it('should throw existing email error', async function () {
                spyOn(registerService,'register').and.callFake((body:User) => {
                    if(body.email === 'existing@test.com')
                        throw new ExistingEmail();
                    return Promise.resolve(user);
                });
                expect(() => {registerService.register(body)}).toThrow(new ExistingEmail());
            });
        });

        describe('when an invalid body is given', () => {
            let body:User = {userId: null, name:'harun', // gender value is not in enum
                surname:'sasmaz',gender:'X',email:'existing@test.com',password:'test', token: null};
            it('should throw registration error', async function () {
                spyOn(registerService,'register').and.callFake((body:User) => {
                    if(body.gender !== 'M' && body.gender !== 'F' && body.gender !== 'U')
                        throw new RegistrationError();
                    return Promise.resolve(user);
                });
                expect(() => {registerService.register(body)}).toThrow(new RegistrationError());
            });
        });
    });
});
