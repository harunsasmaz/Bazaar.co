import {Comment} from "../../models/comment/comment";
import {ModelMapping} from "../../models/mapping/modelMapping";

export class CommentMapping implements ModelMapping{
    public map(commentModel): Comment {
        if(!commentModel) return null;
        return {
            commentId: commentModel.commentId || null,
            userId: commentModel.userId || null,
            productId: commentModel.productId || null,
            title: commentModel.title || null,
            text: commentModel.text || null,
            rating: commentModel.rating || null,
        };
    }
}
