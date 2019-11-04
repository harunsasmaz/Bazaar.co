import { ResponseModel } from "models/response/responseModel";
import { Result } from "models/response/resultModel";
import ErrorModel from "../error/errorModel";

export class ErrorResponse implements ResponseModel{

    result: Result;
    data: null;
    status: number;

    constructor(error: ErrorModel) {
        this.result = {
            code: error.code || 9999,
            message: error.message
        };
        this.data = null;
        this.status = error.status || 400;
    }

}
