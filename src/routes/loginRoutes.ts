import { LoginController } from '../controllers/loginController';
import {Request, Response} from "express";


export class LoginRoutes{
    private loginController: LoginController = new LoginController();

    public routes(app){
        app.route('/api/login')
        .post((req: Request, res: Response) => {
            this.loginController.login(req, res)
        });
    }
}
