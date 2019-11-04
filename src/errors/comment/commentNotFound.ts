import ErrorModel from "../../models/error/errorModel";

export class CommentNotFound implements ErrorModel, Error{
    code: number;
    message: string;
    name: string;
    status: 404;

    constructor(){
        this.code = 5000;
        this.message = "Comment not found";
        this.name = "Comment Not Found";
        this.status = 404;
    }
}
