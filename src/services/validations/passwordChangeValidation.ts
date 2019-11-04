import * as joi from '@hapi/joi';
import {InvalidInformation} from "../../errors/validation/invalidInformation";
import {Validation} from "../../models/validation/validation";

class PasswordChangeValidation implements Validation{
    schema = {
        userId: joi.string().required(),
        password: joi.string().required(),
        oldPassword: joi.string().required()
    };


    check(req){
        try {
            const {error} = joi.validate(req.body, this.schema);
            if(error) throw new InvalidInformation();
        }
        catch(error){
            throw new InvalidInformation();
        }
    }
}

export default new PasswordChangeValidation();
