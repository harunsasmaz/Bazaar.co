import ErrorModel from "../../models/error/errorModel";

export class PasswordChangeError implements ErrorModel, Error{
    code: number;
    message: string;
    name: string;
    status: number;

    constructor(){
        this.code = 2004;
        this.message = "Password change error";
        this.name = 'Password Change Error';
        this.status = 500;
    }
}
