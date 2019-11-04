import { CommentController } from '../controllers/commentController';
import { TokenService }  from '../services/token/tokenService';
import {Request, Response} from "express";

export class CommentRoutes{
    public commentController: CommentController = new CommentController();
    private tokenService = new TokenService();

    public routes(app){
        app.route('/api/comment/add')
            .post(this.tokenService.checkToken,(req: Request, res: Response) => {
                this.commentController.addComment(req, res)
            });

        app.route('/api/comment/edit/')
            .put(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.commentController.editComment(req, res)
            });
        
        app.route('/api/comment/delete/:commentId/:userId')
            .delete(this.tokenService.checkToken, (req: Request, res: Response) => {
                this.commentController.deleteComment(req, res)
            });

        app.route('/api/comment/get/average/:productId').get((req: Request,res:Response) => {
            this.commentController.getAverageRate(req,res)
        })
    }
}

