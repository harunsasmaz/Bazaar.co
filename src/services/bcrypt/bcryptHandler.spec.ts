import {BcryptHandler} from "./bcryptHandler";
import {WrongPasswordOrEmail} from "../../errors/update/wrongPasswordOrEmail";
import * as bcrypt from 'bcrypt';


describe('Bcrypt Handler Test',() => {
    let bcryptHandler: BcryptHandler;

    beforeEach(() => {
        bcryptHandler = new BcryptHandler();
    });

    describe('comparePasswords function', () => {
        let targetPsw = 'Hakan123';
        let validPsw = 'Hakan123';
        let wrongPsw = 'Hakan1';
        it('When passwords match, it is executed successfully', ()=>{
            spyOn(bcrypt, 'compare').and.callFake((sourcePsw, targetPsw) => {
                return Promise.resolve(sourcePsw === targetPsw);
            });
            expect(() => {bcryptHandler.comparePasswords(validPsw,targetPsw)}).not.toThrow();
        });
        it('When passwords dont match, it throws an error', async ()=>{
            spyOn(bcrypt, 'compare').and.callFake((sourcePsw, targetPsw) => {
                return Promise.resolve(sourcePsw === targetPsw);
            });
            let e;
            try{
                await bcryptHandler.comparePasswords(wrongPsw,targetPsw)
            }
            catch(error){
                e = error;
            }
            expect(e).toEqual(new WrongPasswordOrEmail());
        });
    });
});