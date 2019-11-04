import {ChangeInfoService} from "../services/dbCRUDServices/changeInfoService";
import {SuccessResponse} from "../models/response/successResponse";
import {ErrorResponse} from "../models/response/errorResponse";
import {ResponseModel} from "../models/response/responseModel";
import {User} from "../models/user/user";

export class ChangeInfoBusiness{
    changeInfoService: ChangeInfoService;

    constructor(){
        this.changeInfoService = new ChangeInfoService();
    }

    public async getUser(userId: string): Promise<ResponseModel> {
        try {
            let result = await this.changeInfoService.getUser(userId);
            return new SuccessResponse(result);
        } catch(error){
            return new ErrorResponse(error);
        }
    }

    public async updateUserInfo(newUserInfo: User): Promise<ResponseModel> {
        try {
            let result = await this.changeInfoService.updateUserInfo(newUserInfo);
            return new SuccessResponse(result);
        } catch(error){
            return new ErrorResponse(error);
        }
    }

    public async changePassword(userId: string, oldPassword: string, password: string): Promise<ResponseModel> {
        try {
            await this.changeInfoService.isOldPasswordTrue(userId, oldPassword);
            let result = await this.changeInfoService.changePassword(userId, password);
            return new SuccessResponse(result);
        } catch(error){
            return new ErrorResponse(error);
        }
    }
}
