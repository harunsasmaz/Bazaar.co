import { Request, Response } from 'express';
import updateValidation from "../services/validations/updateValidation";
import passwordChangeValidation from "../services/validations/passwordChangeValidation";
import { ErrorResponse } from '../models/response/errorResponse';
import { ChangeInfoBusiness } from "../businesses/changeInfoBusiness";
import {UserMapping} from "../services/mappings/userMapping";
import {InfoUpdateError} from "../errors/update/infoUpdateError";


export class ChangeInfoController{

    changeInfoBusiness: ChangeInfoBusiness;

    constructor(){
        this.changeInfoBusiness = new ChangeInfoBusiness();
    }

    public async getUser(req: Request, res: Response): Promise<void> {
        try {
            let result = await this.changeInfoBusiness.getUser(req.params.userId);
            res.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            res.status(errorResponse.status).send(errorResponse);
        }
    }


    public async updateUserInfo(req: Request, res: Response): Promise<void> {
        try {
            updateValidation.check(req);
            let result = await this.changeInfoBusiness.updateUserInfo(new UserMapping().map(req.body));
            res.status(result.status).send(result);
        }catch(error){
            const errorResponse = new ErrorResponse(new InfoUpdateError());
            res.status(errorResponse.status).send(errorResponse);
        }
    }

    public async changePassword(req: Request, res: Response): Promise<void> {
        try {
            passwordChangeValidation.check(req);
            let result = await this.changeInfoBusiness.changePassword(req.body.userId, req.body.oldPassword, req.body.password);
            res.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            res.status(errorResponse.status).send(errorResponse);
        }
    }

}
