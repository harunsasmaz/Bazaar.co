import ErrorModel from "../../models/error/errorModel";

export class ProductCreateError implements ErrorModel, Error{
    code: number;
    message: string;
    name: string;
    status: number;

    constructor(){
        this.code = 3001;
        this.message = "Could not save product";
        this.name = "Product Creat Error"
        this.status = 417;
    }
}
