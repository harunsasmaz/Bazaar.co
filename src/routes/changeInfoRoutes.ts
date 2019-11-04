import { ChangeInfoController } from '../controllers/changeInfoController';
import { TokenService }  from '../services/token/tokenService';
import {Request, Response} from "express";

export class ChangeInfoRoutes{
    private changeInfoController: ChangeInfoController = new ChangeInfoController();
    private tokenService = new TokenService();

    public routes(app){
        app.route('/api/user/:userId')
        .get( (req: Request, res: Response) => {
            this.changeInfoController.getUser(req,res)
        });
        // get user's info

        app.route('/api/user/userInfo')
        .put(this.tokenService.checkToken, (req: Request, res: Response) => {
            this.changeInfoController.updateUserInfo(req,res)
        });
        // update user's info

        app.route('/api/user/password')
        .put(this.tokenService.checkToken, (req: Request, res: Response) => {
            this.changeInfoController.changePassword(req,res)
        });
        // change user's password
    }
}

