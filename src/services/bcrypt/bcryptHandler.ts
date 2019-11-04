import {WrongPasswordOrEmail} from "../../errors/update/wrongPasswordOrEmail";
import * as bcrypt from 'bcrypt';
import {RegistrationError} from "../../errors/register/registrationError";

export class BcryptHandler {


    public async comparePasswords(sourcePsw:string , targetPsw: string){
        try {
            let match = await bcrypt.compare(sourcePsw, targetPsw);
            if(!match) throw new WrongPasswordOrEmail();
        } catch(err){
            throw new WrongPasswordOrEmail();
        }
    }

    public async passwordHash(password:string): Promise<string> {

        try {
            let salt = await bcrypt.genSalt();
            return await bcrypt.hash(password, salt);
        } catch (e) {
            throw new RegistrationError();
        }
    }


}
