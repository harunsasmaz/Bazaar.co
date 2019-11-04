import {ErrorResponse} from "../models/response/errorResponse";
import {CommentService} from "../services/dbCRUDServices/commentService";
import {SuccessResponse} from "../models/response/successResponse";
import {Comment} from "../models/comment/comment";
import {ResponseModel} from "../models/response/responseModel";

export class CommentBusiness{

    commentService: CommentService;

    constructor(){
        this.commentService = new CommentService();
    }

    public async addComment(comment: Comment): Promise<ResponseModel> {

        try{
            let result = await this.commentService.addComment(comment);
            return new SuccessResponse(result);
        } catch(error){
            return new ErrorResponse(error);
        }
    }

    public async editComment(comment: Comment): Promise<ResponseModel> {
        try {
            let result = await this.commentService.editComment(comment);
            return new SuccessResponse(result);
        } catch(error){
            return new ErrorResponse(error);
        }
    }

    public async deleteComment(commentId: string): Promise<ResponseModel> {
        try {
            await this.commentService.deleteComment(commentId);
            return new SuccessResponse(null);
        } catch(error){
            return new ErrorResponse(error);
        }
    }

    public async getAverageRate(productId: string): Promise<ResponseModel> {
        try {
            let result = await this.commentService.getAverageRateOfProduct(productId);
            return new SuccessResponse(result);
        } catch(error){
            return new ErrorResponse(error);
        }
    }

}
