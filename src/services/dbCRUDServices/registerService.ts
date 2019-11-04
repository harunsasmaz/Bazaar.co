import {UserModel} from "../../models/user/userModel";
import * as id from 'uuid/v1';
import {MongoErrorFactory} from "../../errors/mongo/mongoErrorFactory";
import {BcryptHandler} from "../bcrypt/bcryptHandler";
import {User} from "../../models/user/user";
import {UserMapping} from "../mappings/userMapping";

export class RegisterService {


    public async register(body: User): Promise<User> {
        try {
            const bcryptHandler = new BcryptHandler();
            const newUser = new UserModel(body);
            newUser.userId = id();
            newUser.password = await bcryptHandler.passwordHash(newUser.password);
            let result =  await newUser.save();
            return (new UserMapping()).map(result);
        } catch (err) {
            throw (new MongoErrorFactory(err)).getError();
        }

    }
}
