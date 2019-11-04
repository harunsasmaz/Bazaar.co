import * as joi from '@hapi/joi';
import {InvalidInformation} from "../../errors/validation/invalidInformation";
import {Validation} from "../../models/validation/validation";

class ProductValidation implements Validation{

    schema = {
        name: joi.string().required(),
        price: joi.number().required(),
        description: joi.string().required(),
        userId: joi.string().required(),
        categoryId: joi.string().required(),
        image: joi.string().required(),
        imageType: joi.string().required(),
        stock: joi.boolean().required()
    };

    check(req){
        try {
            const {error} = joi.validate(req.body,this.schema);
            if(error) throw new InvalidInformation();
        } catch (error) {
            throw error;
        }
    }
}

export default new ProductValidation();
