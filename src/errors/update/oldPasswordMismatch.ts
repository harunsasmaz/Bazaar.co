import ErrorModel from "../../models/error/errorModel";

export class OldPasswordMismatch implements ErrorModel, Error{
    code: number;
    message: string;
    name: string;
    status: number;

    constructor(){
        this.code = 1006;
        this.message = "Old password is wrong";
        this.name = 'Old Password Mismatch';
        this.status = 400;
    }
}
