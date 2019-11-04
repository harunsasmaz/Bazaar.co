import * as joi from '@hapi/joi';
import {InvalidInformation} from "../../errors/validation/invalidInformation";
import {Validation} from "../../models/validation/validation";

class CommentEditValidation implements Validation{

    schema = {
        userId: joi.string().required(),
        commentId: joi.string().required(),
        title: joi.string().required(),
        text: joi.string().required(),
        rating: joi.number().required()
    };

    check(req){
        try {
            const {error} = joi.validate(req.body, this.schema);
            if(error) throw new InvalidInformation();
        } catch(error){
            throw new InvalidInformation();
        }
    }
}

export default new CommentEditValidation();
