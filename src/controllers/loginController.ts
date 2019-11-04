import { Request, Response } from 'express';
import loginValidation from '../services/validations/loginValidation';
import { ErrorResponse } from '../models/response/errorResponse';
import { LoginBusiness } from "../businesses/loginBusiness";

export class LoginController{

    loginBusiness: LoginBusiness;

    constructor() {
        this.loginBusiness = new LoginBusiness();
    }


    public async login(req: Request, res: Response): Promise<void> {
        try {
            loginValidation.check(req);
            let result = await this.loginBusiness.login(req.body.email, req.body.password);
            res.status(result.status).send(result);
        } catch(error) {
            const errorResponse = new ErrorResponse(error);
            res.status(errorResponse.status).send(new ErrorResponse(error));
        }

    }
}

