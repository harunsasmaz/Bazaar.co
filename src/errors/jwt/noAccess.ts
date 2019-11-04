import ErrorModel from "../../models/error/errorModel";

export class NoAccess implements ErrorModel, Error{
    code: number;
    message: string;
    name: string;
    status: number;

    constructor(){
        this.code = 2003;
        this.message = "Access failed";
        this.name = "No Access";
        this.status = 401;
    }
}
