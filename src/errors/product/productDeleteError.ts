import ErrorModel from "../../models/error/errorModel";

export class ProductDeleteError implements ErrorModel, Error{
    code: number;
    message: string;
    name: string;
    status: number;

    constructor(){
        this.code = 3004;
        this.message = "Could not delete product";
        this.name = "Product Delete Error";
        this.status = 417;
    }
}
