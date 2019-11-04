import ErrorModel from "../../models/error/errorModel";

export class CategoriesNotFound implements ErrorModel, Error {
    code: number;
    message: string;
    name: string;
    status: number;

    constructor(){
        this.code = 4000;
        this.message = "Categories not found";
        this.name = "Categories Not Found"
        this.status = 404;
    }
}
