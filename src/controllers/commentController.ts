import {ErrorResponse} from "../models/response/errorResponse";
import commentValidation from "../services/validations/commentValidation";
import commentEditValidation from "../services/validations/commentEditValidation";
import {CommentBusiness} from "../businesses/commentBusiness";
import { Request, Response} from "express";
import {CommentMapping} from "../services/mappings/commentMapping";

export class CommentController{
    commentBusiness: CommentBusiness;

    constructor(){
        this.commentBusiness = new CommentBusiness();
    }

    public async addComment(req: Request, res: Response): Promise<void> {
        try {
            commentValidation.check(req);
            let result = await this.commentBusiness.addComment(new CommentMapping().map(req.body));
            res.status(result.status).send(result);
        }
        catch(error){
            const errorResponse = new ErrorResponse(error);
            res.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

    public async editComment(req: Request, res: Response): Promise<void> {
        try {
            commentEditValidation.check(req);

            let result = await this.commentBusiness.editComment(new CommentMapping().map(req.body));
            res.status(result.status).send(result);
        } catch(error){
            const errorResponse = new ErrorResponse(error);
            res.status(errorResponse.status).send(new ErrorResponse(error));
        }

    }

    public async getAverageRate(req: Request, res: Response): Promise<void> {
        try {
            let result = await this.commentBusiness.getAverageRate(req.params.productId);
            res.status(result.status).send(result);
        } catch (e) {
            const errorResponse = new ErrorResponse(e);
            res.status(errorResponse.status).send(new ErrorResponse(e));
        }
    }

    public async deleteComment(req: Request, res: Response): Promise<void> {
        try {
            let result = await this.commentBusiness.deleteComment(req.params.commentId);
            res.status(result.status).send(result);
        }catch(error){
            const errorResponse = new ErrorResponse(error);
            res.status(errorResponse.status).send(new ErrorResponse(error));
        }
    }

}
