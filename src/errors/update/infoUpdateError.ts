import ErrorModel from "../../models/error/errorModel";

export class InfoUpdateError implements ErrorModel, Error{
    code: number;
    message: string;
    name: string;
    status: number;

    constructor(){
        this.code = 1004;
        this.message = "User info update error";
        this.name = 'Info Update Error';
        this.status = 304;
    }
}
