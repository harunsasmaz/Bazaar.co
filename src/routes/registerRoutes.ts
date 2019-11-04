import { RegisterController } from '../controllers/registerController';
import {Request, Response} from "express";


export class RegisterRoutes{
    private registerController: RegisterController;

    constructor() {
        this.registerController = new RegisterController();
    }

    public routes(app){
        app.route('/api/register').post( (req: Request, res: Response) => {
            this.registerController.addNewUser(req, res);
        });
    }
}
