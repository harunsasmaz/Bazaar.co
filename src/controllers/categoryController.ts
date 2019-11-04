import * as categories from '../data/categories.json';
import {ErrorResponse} from "../models/response/errorResponse";
import {CategoryBusiness} from "../businesses/categoryBusiness";
import {Request, Response} from "express";

export class CategoryController{

    categoryBusiness: CategoryBusiness;

    constructor() {
        this.categoryBusiness = new CategoryBusiness();
    }

    public createCategories(): void {
        const data = (<any>categories).data;
        this.categoryBusiness.createCategories(data);
    }

    public async getCategories(req: Request, res: Response): Promise<void> {
        let result = await this.categoryBusiness.getCategories();
        res.status(result.status).send(result);
    }

    public async getCategoryById(req: Request, res: Response): Promise<void> {
        try {
            let result = await this.categoryBusiness
                .getCategoryById(req.params.categoryId, req.params.field,  req.params.order, req.params.skip, req.params.limit,req.params.min,req.params.max);
            res.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            res.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }
}
