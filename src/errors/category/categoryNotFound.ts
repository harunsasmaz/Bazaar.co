import ErrorModel from "../../models/error/errorModel";

export class CategoryNotFound implements ErrorModel, Error {
    code: number;
    message: string;
    name: string;
    status: number;

    constructor(){
        this.code = 4001;
        this.message = "Category not found";
        this.name = "Category Not Found";
        this.status = 404;
    }
}
