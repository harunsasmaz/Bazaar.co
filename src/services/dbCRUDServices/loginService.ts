import {User} from "../../models/user/user";
import { UserModel } from "../../models/user/userModel";
import {WrongPasswordOrEmail} from "../../errors/update/wrongPasswordOrEmail";
import { TokenService }  from "../token/tokenService";
import {BcryptHandler} from "../bcrypt/bcryptHandler";
import {UserMapping} from "../mappings/userMapping";

export class LoginService {
    tokenService:TokenService;
    bcryptHandler:BcryptHandler;

    constructor() {
        this.tokenService = new TokenService();
        this.bcryptHandler = new BcryptHandler();
    }

    public async login(email: string, password: string): Promise<User> {
        try {
            let result = await UserModel.findOne({email: email});
            if(!result) throw new WrongPasswordOrEmail();
            await this.bcryptHandler.comparePasswords(password, result.password);
            let user = (new UserMapping()).map(result);
            user.token = this.tokenService.signIn(result.userId);
            return user;
        } catch(error) {
            throw error
        }
    }
}
