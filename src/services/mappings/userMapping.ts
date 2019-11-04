import {User} from "../../models/user/user";
import {ModelMapping} from "../../models/mapping/modelMapping";

export class UserMapping implements ModelMapping{
    public map(userModel): User {
        if(!userModel) return null;
        return {
            userId: userModel.userId || null,
            name: userModel.name || null,
            surname: userModel.surname || null,
            gender: userModel.gender || null,
            email: userModel.email || null,
            password: userModel.password || null,
            token: userModel.token || null
        };
    }
}
