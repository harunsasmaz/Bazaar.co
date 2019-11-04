import ErrorModel from "../../models/error/errorModel";

export class CommentRemovalError implements ErrorModel, Error {
    code: number;
    message: string;
    name: string;
    status: number;

    constructor(){
        this.code = 5001;
        this.message = "Error while removing comment";
        this.name = "Comment Removal Error";
        this.status = 417;
    }
}
