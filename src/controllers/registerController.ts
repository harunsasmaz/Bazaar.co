import { Request, Response } from 'express';
import registerValidation from '../services/validations/registerValidation';
import { ErrorResponse } from '../models/response/errorResponse';
import {RegisterBusiness} from "../businesses/registerBusiness";
import {UserMapping} from "../services/mappings/userMapping";

export class RegisterController{

    public registerBusiness:RegisterBusiness;

    constructor() {
        this.registerBusiness = new RegisterBusiness();
    }

    public async addNewUser(req: Request, res: Response): Promise<void> {

        try {
            registerValidation.check(req);
            let result = await this.registerBusiness.register(new UserMapping().map(req.body));
            res.status(result.status).send(result);
        } catch (error) {
            const errorResponse = new ErrorResponse(error);
            res.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }
}
