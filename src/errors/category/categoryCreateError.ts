import ErrorModel from "../../models/error/errorModel";

export class CategoryCreateError implements ErrorModel, Error{
    code: number;
    message: string;
    name: string;
    status: number;

    constructor(){
        this.code = 3005;
        this.message = "Could not create category";
        this.name = "Category Create Error";
        this.status = 417;
    }
}
