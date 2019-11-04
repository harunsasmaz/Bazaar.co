import {RegisterService} from "../services/dbCRUDServices/registerService";
import {SuccessResponse} from "../models/response/successResponse";
import {ErrorResponse} from "../models/response/errorResponse";
import {ResponseModel} from "../models/response/responseModel";
import {User} from "../models/user/user";


export class RegisterBusiness {

    registerService: RegisterService;

    constructor() {
        this.registerService = new RegisterService();
    }

    public async register(user: User): Promise<ResponseModel> {
        try {
            let result = await this.registerService.register(user);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

}
