import { CategoryController } from '../controllers/categoryController';
import {Request, Response} from "express";

export class CategoryRoutes{
    public categoryController: CategoryController = new CategoryController();

    public routes(app){
        app.route('/api/category/:categoryId/:field/:order/:skip/:limit/:min/:max')
        .get((req: Request, res: Response) => {
            this.categoryController.getCategoryById(req,res)
        });

        app.route('/api/categories')
        .get((req: Request, res: Response) => {
            this.categoryController.getCategories(req,res)
        });
        
    }
}

