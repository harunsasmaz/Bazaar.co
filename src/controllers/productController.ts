import { Request, Response } from "express";
import productValidation from "../services/validations/productValidation";
import { ProductBusiness } from "../businesses/productBusiness";
import { ErrorResponse } from "../models/response/errorResponse";
import productUpdateValidation from "../services/validations/productUpdateValidation";
import {ProductMapping} from "../services/mappings/productMapping";


export class ProductController {

    productBusiness: ProductBusiness;

    constructor(){
        this.productBusiness = new ProductBusiness();
    }

    public async addProduct(req: Request, res: Response): Promise<void> {
       try {
           productValidation.check(req);
           let result = await this.productBusiness.addProduct(new ProductMapping().map(req.body));
           res.status(result.status).send(result);
       } catch (error) {
           const errorResponse = new ErrorResponse(error);
           res.status(errorResponse.status).send(new ErrorResponse(error));
       }

    }

    public async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            productUpdateValidation.check(req);
            let result = await this.productBusiness.updateProduct(new ProductMapping().map(req.body), req.params.imageCase);
            res.status(result.status).send(result);
        } catch (error) {
            const errorResponse = new ErrorResponse(error);
            res.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async deleteProduct(req: Request , res: Response): Promise<void> {
        try {
            let result = await this.productBusiness.deleteProduct(req.params.productId);
            res.status(result.status).send(result);
        } catch (error) {
            const errorResponse = new ErrorResponse(error);
            res.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async getProductById(req: Request , res: Response): Promise<void> {
        try {
            let result = await this.productBusiness.getProductById(req.params.productId);
            res.status(result.status).send(result);
        } catch (error) {
            const errorResponse = new ErrorResponse(error);
            res.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async getProductsByUserId(req: Request, res: Response): Promise<void> {
        try{
            let result = await this.productBusiness.getProductsByUserId(req.params.userId);
            res.status(result.status).send(result);
        } catch(error) {
            const errorResponse = new ErrorResponse(error);
            res.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }
}
