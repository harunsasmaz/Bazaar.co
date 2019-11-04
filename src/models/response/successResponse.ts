import { ResponseModel } from './responseModel';
import { Result } from 'models/response/resultModel';

export class SuccessResponse implements ResponseModel {

    result: Result; 
    data: null;
    status: number;

    constructor(data) {
        this.result = {
            code : 0,
            message : "Success"
        };
        this.data = data;
        this.status = 200;
    }
     
}
