import ErrorModel from "../../models/error/errorModel";

export class ProductNotFound implements ErrorModel, Error{
    code: number;
    message: string;
    name: string;
    status: number;

    constructor(){
        this.code = 3003;
        this.message = "Product not found";
        this.name = "Product Not Found";
        this.status = 404;
    }
}
