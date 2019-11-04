import {ChangeInfoBusiness} from "./changeInfoBusiness";
import {User} from "../models/user/user";
import {ResponseModel} from "../models/response/responseModel";
import {SuccessResponse} from "../models/response/successResponse";
import {UserNotFound} from "../errors/userExistence/userNotFound";
import {ErrorResponse} from "../models/response/errorResponse";
import {InfoUpdateError} from "../errors/update/infoUpdateError";
import {OldPasswordMismatch} from "../errors/update/oldPasswordMismatch";
import {PasswordChangeError} from "../errors/update/passwordChangeError";
import {CommentBusiness} from "./commentBusiness";
import {Comment} from '../models/comment/comment'
import {InvalidInformation} from "../errors/validation/invalidInformation";
import {CommentNotFound} from "../errors/comment/commentNotFound";
import {CommentRemovalError} from "../errors/comment/commentRemovalError";

describe('Comment Business Test', () => {
    let commentBusiness: CommentBusiness;

    beforeEach(() => {
        commentBusiness = new CommentBusiness();
    });

    describe('addComment function', () => {
        let validComment: Comment = {
            commentId: '0',
            userId: 'hakan',
            productId: 'araba',
            text: 'guzel bir araba',
            rating: 5,
            title: 'test'
        };
        let wrongRatingComment: Comment = {
            commentId: '0',
            userId: 'hakan',
            productId: 'araba',
            text: 'guzel bir araba',
            rating: 5,
            title: 'test'
        };
        let wrongTextComment: Comment = {
            commentId: '0',
            userId: 'hakan',
            productId: 'araba',
            text: 'guzel bir araba',
            rating: 5,
            title: 'test'
        };

        describe('SuccessResponse cases', ()=>{
            it('Returned value is SuccessResponse', async()=>{
                spyOn(commentBusiness.commentService, 'addComment').and.returnValue(Promise.resolve(validComment));
                let result = await commentBusiness.addComment(validComment);
                expect(result instanceof SuccessResponse).toEqual(true);
            });
            it('Response\'s status is 200', async()=>{
                spyOn(commentBusiness.commentService, 'addComment').and.returnValue(Promise.resolve(validComment));
                let result = await commentBusiness.addComment(validComment);
                expect(result.status).toEqual(200);
            });
            it('Response\'s data is true', async()=>{
                spyOn(commentBusiness.commentService, 'addComment').and.returnValue(Promise.resolve(validComment));
                let result = await commentBusiness.addComment(validComment);
                expect(result.data).toEqual(validComment);
            });
        });

        describe('ErrorResponse cases', () => {
            it('Returned value is ErrorResponse', async()=>{
                spyOn(commentBusiness.commentService, 'addComment').and.callFake(() => {
                    throw new InvalidInformation();
                });
                let result = await commentBusiness.addComment(wrongRatingComment);
                expect(result instanceof ErrorResponse).toEqual(true);
            });
            it('Returned value is ErrorResponse', async()=>{
                spyOn(commentBusiness.commentService, 'addComment').and.callFake(() => {
                    throw new InvalidInformation();
                });
                let result = await commentBusiness.addComment(wrongTextComment);
                expect(result instanceof ErrorResponse).toEqual(true);
            });
            it('Response\'s status is 400', async()=>{
                spyOn(commentBusiness.commentService, 'addComment').and.callFake(() => {
                    throw new InvalidInformation();
                });
                let result = await commentBusiness.addComment(wrongRatingComment);
                expect(result.status).toEqual(400);
            });
            it('Response\'s status is 400', async()=>{
                spyOn(commentBusiness.commentService, 'addComment').and.callFake(() => {
                    throw new InvalidInformation();
                });
                let result = await commentBusiness.addComment(wrongTextComment);
                expect(result.status).toEqual(400);
            });
        });
    });

    describe('editComment function', () => {
        let validComment: Comment = {
            commentId: '0',
            userId: 'hakan',
            productId: 'araba',
            text: 'guzel bir araba',
            rating: 5,
            title: 'test'
        };
        let wrongRatingComment: Comment = {
            commentId: '0',
            userId: 'hakan',
            productId: 'araba',
            text: 'guzel bir araba',
            rating: 5,
            title: 'test'
        };
        let wrongTextComment: Comment = {
            commentId: '0',
            userId: 'hakan',
            productId: 'araba',
            text: 'guzel bir araba',
            rating: 5,
            title: 'test'
        };

        describe('SuccessResponse cases', ()=>{
            it('Returned value is SuccessResponse', async()=>{
                spyOn(commentBusiness.commentService, 'editComment').and.returnValue(Promise.resolve(validComment));
                let result = await commentBusiness.editComment(validComment);
                expect(result instanceof SuccessResponse).toEqual(true);
            });
            it('Response\'s status is 200', async()=>{
                spyOn(commentBusiness.commentService, 'editComment').and.returnValue(Promise.resolve(validComment));
                let result = await commentBusiness.editComment(validComment);
                expect(result.status).toEqual(200);
            });
            it('Response\'s data is true', async()=>{
                spyOn(commentBusiness.commentService, 'editComment').and.returnValue(Promise.resolve(validComment));
                let result = await commentBusiness.editComment(validComment);
                expect(result.data).toEqual(validComment);
            });
        });

        describe('ErrorResponse cases', () => {
            it('Returned value is ErrorResponse', async()=>{
                spyOn(commentBusiness.commentService, 'editComment').and.callFake(() => {
                    throw new CommentNotFound();
                });
                let result = await commentBusiness.editComment(wrongRatingComment);
                expect(result instanceof ErrorResponse).toEqual(true);
            });
            it('Returned value is ErrorResponse', async()=>{
                spyOn(commentBusiness.commentService, 'editComment').and.callFake(() => {
                    throw new CommentNotFound();
                });
                let result = await commentBusiness.editComment(wrongTextComment);
                expect(result instanceof ErrorResponse).toEqual(true);
            });
            it('Response\'s status is 400', async()=>{
                spyOn(commentBusiness.commentService, 'editComment').and.callFake(() => {
                    throw new CommentNotFound();
                });
                let result = await commentBusiness.editComment(wrongRatingComment);
                expect(result.status).toEqual(404);
            });
            it('Response\'s status is 400', async()=>{
                spyOn(commentBusiness.commentService, 'editComment').and.callFake(() => {
                    throw new CommentNotFound();
                });
                let result = await commentBusiness.editComment(wrongTextComment);
                expect(result.status).toEqual(404);
            });
        });
    });

    describe('deleteComment function', () => {
        let validCommentId = 'comment0';
        let wrongCommentId = 'comment1';
        describe('SuccessResponse cases',() => {
            it('Returned value is SuccessResponse', async()=>{
                spyOn(commentBusiness.commentService, 'deleteComment');
                let result = await commentBusiness.deleteComment(validCommentId);
                expect(result instanceof SuccessResponse).toEqual(true);
            });
            it('Response\'s status is 200', async()=>{
                spyOn(commentBusiness.commentService, 'deleteComment');
                let result = await commentBusiness.deleteComment(validCommentId);
                expect(result.status).toEqual(200);
            });
        });

        describe('ErrorResponse cases', () => {
            it('Returned value is ErrorResponse', async()=>{
                spyOn(commentBusiness.commentService, 'deleteComment').and.callFake((commentId: string)=>{
                    throw new CommentRemovalError();
                });
                let result = await commentBusiness.deleteComment(validCommentId);
                expect(result instanceof ErrorResponse).toEqual(true);
            });
            it('Response\'s status is 417', async()=>{
                spyOn(commentBusiness.commentService, 'deleteComment').and.callFake((commentId: string)=>{
                    throw new CommentRemovalError();
                });
                let result = await commentBusiness.deleteComment(validCommentId);
                expect(result.status).toEqual(417);
            });
        })
    });

});