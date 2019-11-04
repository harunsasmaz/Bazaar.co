import ErrorModel from "../../models/error/errorModel";

export class WrongPasswordOrEmail implements ErrorModel, Error {
    code: number;
    message: string;
    name: string;
    status: number;

    constructor(){
        this.code = 1009;
        this.message = "Email or password is wrong";
        this.name = 'Wrong Password or Email';
        this.status = 404;
    }
}
