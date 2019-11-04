import {RegisterBusiness} from "./registerBusiness";
import {User} from "../models/user/user";
import {SuccessResponse} from "../models/response/successResponse";
import {GenderValidationError} from "../errors/validation/genderValidationError";
import {ErrorResponse} from "../models/response/errorResponse";
import {ExistingEmail} from "../errors/userExistence/existingEmail";


describe('RegisterBusiness Test', () => {

    let registerBusiness: RegisterBusiness;

    beforeEach(() => {
        registerBusiness = new RegisterBusiness();
    });

    describe('register function', () => {

        describe('with correct information' , () => {
            let registerValue = {userId: null, name: 'test', surname:'test',
                gender:'U', email:'test@test.com', password:'Test123',token: null};
            let user:Promise<User> = Promise.resolve<User>({userId:'testUser',name:'test',
                surname:'test',gender:'U',email:'test@test.com',password:'hashed',token:null});

            it('should successfully register', async () => {
                spyOn(registerBusiness.registerService, 'register').and.callFake(() => { return user });
                let result = await registerBusiness.register(registerValue);
                expect(result instanceof SuccessResponse).toEqual(true);
            });
        });

        describe('with incorrect data', ()=> {
            describe('if gender value is invalid', () => {
                let registerValue = {userId: null, name: 'test', surname:'test',
                    gender:'Erkek', email:'test@test.com', password:'Test123',token: null};

                it('should send gender validation error', async () => {
                    spyOn(registerBusiness.registerService, 'register').and.callFake(() => { throw new GenderValidationError()});
                    let result = await registerBusiness.register(registerValue);
                    expect(result instanceof ErrorResponse).toEqual(true);
                });

                it('should have different status than 200', async () => {
                    spyOn(registerBusiness.registerService, 'register').and.callFake(() => { throw new GenderValidationError()});
                    let result = await registerBusiness.register(registerValue);
                    expect(result.status).toEqual(400);
                });

                it('should not have data', async () => {
                    spyOn(registerBusiness.registerService, 'register').and.callFake(() => { throw new GenderValidationError()});
                    let result = await registerBusiness.register(registerValue);
                    expect(result.data).toEqual(null);
                });
            });

            describe('if email exists', () => {
                let registerValue = {userId: null, name: 'test', surname:'test',
                    gender:'Erkek', email:'existing@test.com', password:'Test123',token: null};

                it('should send existing email error', async () => {
                    spyOn(registerBusiness.registerService, 'register').and.callFake(() => { throw new ExistingEmail()});
                    let result = await registerBusiness.register(registerValue);
                    expect(result instanceof ErrorResponse).toEqual(true);
                });

                it('should have different status than 200', async () => {
                    spyOn(registerBusiness.registerService, 'register').and.callFake(() => { throw new ExistingEmail()});
                    let result = await registerBusiness.register(registerValue);
                    expect(result.status).toEqual(400);
                });
            })
        });
    });
});
