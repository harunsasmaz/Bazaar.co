import ErrorModel from "../../models/error/errorModel";

export class ProductUpdateError implements ErrorModel, Error{
    code: number;
    message: string;
    name: string;
    status: number;

    constructor(){
        this.code = 3002;
        this.message = "Could not update product";
        this.name = "Product Update Error";
        this.status = 417;
    }
}
