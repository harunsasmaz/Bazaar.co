import {Comment} from "../../models/comment/comment";
import { CommentModel } from '../../models/comment/commentModel'
import {InvalidInformation} from "../../errors/validation/invalidInformation";
import * as id from 'uuid/v1'
import {CommentNotFound} from "../../errors/comment/commentNotFound";
import {CommentRemovalError} from "../../errors/comment/commentRemovalError";
import {CommentMapping} from "../mappings/commentMapping";
import {NoAccess} from "../../errors/jwt/noAccess";

export class CommentService {

    public async addComment(commentInfo: Comment): Promise<Comment> {
        try {
            const newComment = new CommentModel(commentInfo);
            newComment.commentId = id();
            let result = await newComment.save();
            return (new CommentMapping()).map(result);
        } catch(err){
            throw new InvalidInformation();
        }
    }

    public async getCommentsByProductId(productId: string): Promise<Comment[]> {
        try {
            let result = await CommentModel.find({productId: productId});
            let comments: Comment[] = [];
            const mapping = new CommentMapping();
            for(let i = 0 ; i < result.length ; i++){
                comments.push(mapping.map(result[i]));
            }
            return comments;
        } catch(err){
            throw new CommentNotFound();
        }
    }

    public async getAverageRateOfProduct(productId: string): Promise<number> {
        try {
            let comments = await CommentModel.find({productId: productId});
            let sum = 0;
            comments.forEach( c => sum = sum + c.rating);
            return sum/comments.length;
        } catch (e) {
            throw new NoAccess();
        }
    }

    public async editComment(commentInfo: Comment): Promise<Comment> {
        try {
            let data = {
                text: commentInfo.text,
                rating: commentInfo.rating,
                title: commentInfo.title,
            };
            let comment = await CommentModel.findOneAndUpdate({commentId: commentInfo.commentId}, data, {new: true});

            if (!comment) throw new CommentNotFound();
            return (new CommentMapping()).map(comment);
        } catch(err){
            throw new CommentNotFound();
        }
    }

    public async deleteCommentsByProductId(productId: string): Promise<void> {
        try {
            await CommentModel.remove({productId: productId});
        } catch(err){
            throw new CommentRemovalError();
        }
    }

    public async deleteComment(commentId: string): Promise<void> {
        try {
            await CommentModel.remove({commentId: commentId});
        } catch(err){
            throw new CommentRemovalError();
        }
    }

}
