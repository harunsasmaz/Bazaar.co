import ErrorModel from "../../models/error/errorModel";

export class RegistrationError implements ErrorModel, Error{
    code: number;
    message: string;
    name: string;
    status: number;

    constructor(){
        this.code = 1005;
        this.message = "Registration error";
        this.name = 'Registration Error';
        this.status = 417;
    }
}
