import {GenderValidationError} from "../validation/genderValidationError";
import {ExistingEmail} from "../userExistence/existingEmail";
import {RegistrationError} from "../register/registrationError";

export class MongoErrorFactory{
    error: Error;

    constructor(error: Error){
        this.error = error;
    }

    getError(): Error{
        if(this.error.name === 'ValidationError'){
            return new GenderValidationError();
        }
        else if(this.error.name === 'MongoError'){
            return new ExistingEmail();
        } else {
            return new RegistrationError();
        }
    }
}
