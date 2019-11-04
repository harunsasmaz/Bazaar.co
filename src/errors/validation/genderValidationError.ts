import ErrorModel from "../../models/error/errorModel";

export class GenderValidationError implements ErrorModel, Error{
    code: number;
    message: string;
    name: string;
    status: number;

    constructor(){
        this.code = 1001;
        this.message = "Gender should be one of these letters: F, M, U";
        this.name = 'Gender Validation Error';
        this.status = 400;
    }
}
