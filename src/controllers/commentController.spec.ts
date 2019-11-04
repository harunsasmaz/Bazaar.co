import {SuccessResponse} from "../models/response/successResponse";
import * as Mocks from 'node-mocks-http';
import {ErrorResponse} from "../models/response/errorResponse";
import {CommentController} from "./commentController";
import {Comment} from "../models/comment/comment";
import {InvalidInformation} from "../errors/validation/invalidInformation";

describe('Comment Controller Test' , () => {

    let commentController: CommentController;

    beforeEach(() => {
        commentController = new CommentController()
    });

    describe('addComment function' , () => {
        let validComment = {
            userId: 'hakan',
            productId: 'araba',
            text: 'guzel bir araba',
            rating: 5,
            title: 'test'
        };
        let savedComment: Comment = {
            commentId: '0',
            userId: 'hakan',
            productId: 'araba',
            text: 'guzel bir araba',
            rating: 5,
            title: 'test'
        };
        let wrongRatingComment = {
            userId: 'hakan',
            productId: 'araba',
            text: 'guzel bir araba',
            rating: 7,
            title: 'test'
        };
        let wrongTextComment = {
            userId: 'hakan',
            productId: 'araba',
            rating: 5,
            title: 'test'
        };
        describe('Success Response cases', () => {
            it('Response\'s status is 200', async() => {
                const req = Mocks.createRequest({body: validComment});
                const res = Mocks.createResponse();
                spyOn(commentController.commentBusiness, 'addComment').and.returnValue(Promise.resolve(new SuccessResponse(savedComment)));
                await commentController.addComment(req,res);
                expect(res.statusCode).toEqual(200);
            });
            it('Response\'s data is true', async() => {
                const req = Mocks.createRequest({body: validComment});
                const res = Mocks.createResponse();
                spyOn(commentController.commentBusiness, 'addComment').and.returnValue(Promise.resolve(new SuccessResponse(savedComment)));
                await commentController.addComment(req,res);
                expect(res._getData()).toEqual(new SuccessResponse(savedComment));
            });
        });

        describe('Error Response cases', () => {
            it('Response\'s status is 400', async() => {
                const req = Mocks.createRequest({body: wrongTextComment});
                const res = Mocks.createResponse();
                spyOn(commentController.commentBusiness, 'addComment').and.returnValue(Promise.resolve(new ErrorResponse(new InvalidInformation())));
                await commentController.addComment(req,res);
                expect(res.statusCode).toEqual(400);
            });
            it('Response\'s status is 400', async() => {
                const req = Mocks.createRequest({body: wrongRatingComment});
                const res = Mocks.createResponse();
                spyOn(commentController.commentBusiness, 'addComment').and.returnValue(Promise.resolve(new ErrorResponse(new InvalidInformation())));
                await commentController.addComment(req,res);
                expect(res.statusCode).toEqual(400);
            });
        });
    });

    describe('editComment function' , () => {
        let validComment = {
            userId: 'test',
            commentId: '0',
            text: 'guzel bir araba',
            rating: 5,
            title: 'test'
        };
        let savedComment: Comment = {
            commentId: '0',
            userId: 'test',
            productId: 'araba',
            text: 'guzel bir araba',
            rating: 5,
            title: 'test'
        };
        let wrongRatingComment = {
            userId: 'test',
            commentId: '0',
            text: 'guzel bir araba',
            rating: 7,
            title: 'test'
        };
        let wrongTextComment = {
            userId: 'test',
            commentId: '0',
            rating: 5,
            title: 'test'
        };
        describe('Success Response cases', () => {
            it('Response\'s status is 200', async() => {
                const req = Mocks.createRequest({body: validComment});
                const res = Mocks.createResponse();
                spyOn(commentController.commentBusiness, 'editComment').and.returnValue(Promise.resolve(new SuccessResponse(savedComment)));
                await commentController.editComment(req,res);
                expect(res.statusCode).toEqual(200);
            });
            it('Response\'s data is true', async() => {
                const req = Mocks.createRequest({body: validComment});
                const res = Mocks.createResponse();
                spyOn(commentController.commentBusiness, 'editComment').and.returnValue(Promise.resolve(new SuccessResponse(savedComment)));
                await commentController.editComment(req,res);
                expect(res._getData()).toEqual(new SuccessResponse(savedComment));
            });
        });

        describe('Error Response cases', () => {
            it('Response\'s status is 400', async() => {
                const req = Mocks.createRequest({body: wrongTextComment});
                const res = Mocks.createResponse();
                spyOn(commentController.commentBusiness, 'editComment').and.returnValue(Promise.resolve(new ErrorResponse(new InvalidInformation())));
                await commentController.editComment(req,res);
                expect(res.statusCode).toEqual(400);
            });
            it('Response\'s status is 400', async() => {
                const req = Mocks.createRequest({body: wrongRatingComment});
                const res = Mocks.createResponse();
                spyOn(commentController.commentBusiness, 'editComment').and.returnValue(Promise.resolve(new ErrorResponse(new InvalidInformation())));
                await commentController.editComment(req,res);
                expect(res.statusCode).toEqual(400);
            });
        })
    });

    describe('deleteComment function' , () => {
        let validBody = {commentId: '0'};
        let wrongBody = {commentId: '-1'};
        describe('Success Response cases', () => {
            it('Response\'s status is 200', async() => {
                const req = Mocks.createRequest({body: validBody});
                const res = Mocks.createResponse();
                spyOn(commentController.commentBusiness, 'deleteComment').and.returnValue(Promise.resolve(new SuccessResponse(null)));
                await commentController.deleteComment(req,res);
                expect(res.statusCode).toEqual(200);
            });
            it('Response\'s data is true', async() => {
                const req = Mocks.createRequest({body: validBody});
                const res = Mocks.createResponse();
                spyOn(commentController.commentBusiness, 'deleteComment').and.returnValue(Promise.resolve(new SuccessResponse(null)));
                await commentController.deleteComment(req,res);
                expect(res._getData()).toEqual(new SuccessResponse(null));
            });
        });

        describe('Error Response cases', () => {
            it('Response\'s status is 400', async() => {
                const req = Mocks.createRequest({body: wrongBody});
                const res = Mocks.createResponse();
                spyOn(commentController.commentBusiness, 'deleteComment').and.returnValue(Promise.resolve(new ErrorResponse(new InvalidInformation())));
                await commentController.deleteComment(req,res);
                expect(res.statusCode).toEqual(400);
            });
            it('Response\'s status is 400', async() => {
                const req = Mocks.createRequest({body: wrongBody});
                const res = Mocks.createResponse();
                spyOn(commentController.commentBusiness, 'deleteComment').and.returnValue(Promise.resolve(new ErrorResponse(new InvalidInformation())));
                await commentController.deleteComment(req,res);
                expect(res.statusCode).toEqual(400);
            });
        })
    });
});