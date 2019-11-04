import {User} from "../../models/user/user";
import {UserNotFound} from "../../errors/userExistence/userNotFound";
import {InfoUpdateError} from "../../errors/update/infoUpdateError";
import {PasswordChangeError} from "../../errors/update/passwordChangeError";
import {BcryptHandler} from "../bcrypt/bcryptHandler";
import {UserModel} from "../../models/user/userModel";
import {OldPasswordMismatch} from "../../errors/update/oldPasswordMismatch";
import {UserMapping} from "../mappings/userMapping";



export class ChangeInfoService {



    public async getUser(userId: string): Promise<User> {
        try {
            let result = await UserModel.findOne({userId: userId});
            if(!result) throw new UserNotFound();
            return (new UserMapping()).map(result);
        } catch(err){
            throw new UserNotFound();
        }
    }

    public async updateUserInfo(newUserInfo: User): Promise<User> {
        try {
            const data = {
                name: newUserInfo.name,
                surname: newUserInfo.surname,
                gender: newUserInfo.gender
            };
            let result = await UserModel.findOneAndUpdate({userId: newUserInfo.userId}, data, {new: true});
            if(!result) throw new InfoUpdateError();
            return (new UserMapping()).map(result);
        } catch(err){
            throw new InfoUpdateError();
        }
    }

    public async isOldPasswordTrue(userId:string, oldPassword: string): Promise<void> {
        try {
            const bcryptHandler = new BcryptHandler();

            let user = await UserModel.findOne({userId: userId});
            if(!user) throw new UserNotFound();
            await bcryptHandler.comparePasswords(oldPassword, user.password);
        } catch(err) {
            throw new OldPasswordMismatch();
        }
    }

    public async changePassword(userId: string, password: string): Promise<User> {
        try {
            const bcryptHandler = new BcryptHandler();
            let newPassword = await bcryptHandler.passwordHash(password);
            let result = await UserModel.findOneAndUpdate({ userId : userId} , {password: newPassword} , {new:true});
            if(!result) throw new PasswordChangeError();
            return (new UserMapping()).map(result);
        } catch(error) {
            throw new PasswordChangeError();
        }
    }
}
