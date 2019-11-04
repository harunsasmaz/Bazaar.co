import {SuccessResponse} from "../models/response/successResponse";
import {LoginService} from "../services/dbCRUDServices/loginService";
import {ErrorResponse} from "../models/response/errorResponse";
import {ResponseModel} from "../models/response/responseModel";

export class LoginBusiness {

    loginService: LoginService;

    constructor(){
        this.loginService = new LoginService();
    }

    public async login(email: string, password:string): Promise<ResponseModel> {
        try {
            let result = await this.loginService.login(email, password);
            return new SuccessResponse(result);
        } catch(error) {
            return new ErrorResponse(error);
        }
    }
}
