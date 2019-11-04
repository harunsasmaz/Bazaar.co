import * as joi from '@hapi/joi';
import {InvalidInformation} from "../../errors/validation/InvalidInformation";
import {Validation} from "../../models/validation/validation";

class ProductUpdateValidation implements Validation{

    schema = {
        productId: joi.string().required(),
        name: joi.string().required(),
        price: joi.number().required(),
        description: joi.string().required(),
        userId: joi.string().required(),
        categoryId: joi.string().required(),
        image: joi.string(),
        imageType: joi.string(),
        stock: joi.boolean().required()
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

export default new ProductUpdateValidation();
