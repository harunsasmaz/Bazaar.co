import * as jwt from 'jsonwebtoken';
import {NoAccess} from "../../errors/jwt/noAccess";
import {ErrorResponse} from "../../models/response/errorResponse";
import {NextFunction, Request, Response} from "express";
import {config} from "../../_config/config";

export class TokenService{
    signIn(userId: string){
        const secret_key = config.SECRET_KEY;
        return jwt.sign({userId : userId} , secret_key);
    }

    checkToken(req: Request, res:Response, next:NextFunction){

        try {
            const header = req.header('Authorization');
            if (!header) {
                throw new NoAccess();
            }
            const headerArr = header.split(' ');
            if (headerArr.length < 2) {
                throw new NoAccess();
            }
            const token = headerArr[1];
            if (!token) {
                throw new NoAccess();
            }

            const secret_key = config.SECRET_KEY;
            const verified = jwt.verify(token, secret_key);
            if ( (verified.userId !== req.body.userId) && (verified.userId !== req.params.userId) ) {
                throw new NoAccess();
            }
            next();
        } catch(err){
            const errorResponse = new ErrorResponse(new NoAccess());
            res.status(errorResponse.status).send(errorResponse);
        }
    }
}
