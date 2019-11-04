import ErrorModel from "../../models/error/errorModel";

export class UserNotFound implements ErrorModel, Error {
    code: number;
    message: string;
    name: string;
    status: number;

    constructor(){
        this.code = 1002;
        this.message = "Error while finding user";
        this.name = 'User Not Found';
        this.status = 404;
    }
}
