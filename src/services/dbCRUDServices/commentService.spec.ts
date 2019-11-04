import {CommentService} from "./commentService";
import {Comment} from "../../models/comment/comment";
import {InvalidInformation} from "../../errors/validation/invalidInformation";
import {CommentNotFound} from "../../errors/comment/commentNotFound";

describe('Comment Service Test', () => {
    let commentService: CommentService;

    beforeEach(() => {
        commentService = new CommentService();
    });

    describe('addComment function' ,() => {
         let validComment: Comment = {
             commentId: null,
             userId: 'hakan',
             productId: 'araba',
             text: 'guzel',
             rating: 4,
             title: 'test'
         };
        let savedComment: Comment = {
            commentId: '0',
            userId: 'hakan',
            productId: 'araba',
            text: 'guzel',
            rating: 4,
            title: 'test'
        };
         let wrongRating: Comment = {
            commentId: null,
            userId: 'hakan',
            productId: 'araba',
            text: 'guzel',
            rating: 7,
             title: 'test'
         };
         it('It returns a Comment successfully', async() => {
             spyOn(commentService, 'addComment').and.callFake((comment: Comment): Promise<Comment> => {
                 if(comment.rating > 5 || comment.rating < 1) throw new InvalidInformation();
                 comment.commentId = '0';
                 return Promise.resolve(comment);
             });
            let result: Comment = await commentService.addComment(validComment);
            expect(result).toEqual(savedComment);
         });
        it('It throws an error when rating is invalid', async() => {
            spyOn(commentService, 'addComment').and.callFake((comment: Comment): Promise<Comment> => {
                if(comment.rating > 5 || comment.rating < 1) throw new InvalidInformation();
                comment.commentId = '0';
                return Promise.resolve(comment);
            });
            expect(() => {commentService.addComment(wrongRating)}).toThrow(new InvalidInformation());
        });
    });

    describe('getCommentsByProductId function' ,() => {
        let validProductId = '0';
        let wrongProductId = '-1';
        let returnValue: Comment[] = [
            {
                commentId: '0',
                userId: 'hakan',
                productId: 'araba',
                text: 'guzel',
                rating: 4,
                title: 'test'
            },
            {
                commentId: '1',
                userId: 'hakan',
                productId: 'araba',
                text: 'guzel',
                rating: 4,
                title: 'test'
            }
        ];

        it('It returns Comments successfully', async() => {
            spyOn(commentService, 'getCommentsByProductId').and.callFake((productId: string): Promise<Comment[]> => {
                if(productId === '0' ) return Promise.resolve(returnValue);
                throw new CommentNotFound();
            });
            let result: Comment[] = await commentService.getCommentsByProductId(validProductId);
            expect(result).toEqual(returnValue);
        });
        it('It throws an error when productId is invalid', async() => {
            spyOn(commentService, 'getCommentsByProductId').and.callFake((productId: string): Promise<Comment[]> => {
                if(productId === '0' ) return Promise.resolve(returnValue);
                throw new CommentNotFound();
            });
            expect(() => {commentService.getCommentsByProductId(wrongProductId)}).toThrow(new CommentNotFound());
        });
    });

    describe('editComment function',() => {
        let validComment: Comment = {
            commentId: '0',
            text: 'guzel',
            rating: 3,
            productId: 'araba',
            userId: 'hakan',
            title: 'test'
        };
        let wrongId: Comment = {
            commentId: '-1',
            text: 'guzel',
            rating: 3,
            productId: 'araba',
            userId: 'hakan',
            title: 'test'
        };
        let savedComment: Comment = {
            commentId: '0',
            text: 'guzel',
            rating: 3,
            productId: 'araba',
            userId: 'hakan',
            title: 'test'
        };
        it('When comment is true it returns saved comment successfully', async() => {
            spyOn(commentService, 'editComment').and.callFake((comment: Comment): Promise<Comment> =>{
                if(comment.commentId === '0') return Promise.resolve(savedComment);
                throw new CommentNotFound();
            });
            let result = await commentService.editComment(validComment);
            expect(result).toEqual(savedComment);
        });
        it('When comment is invalid it throws an error', async() => {
            spyOn(commentService, 'editComment').and.callFake((comment: Comment): Promise<Comment> =>{
                if(comment.commentId === '0') return Promise.resolve(savedComment);
                throw new CommentNotFound();
            });
            expect(() => {commentService.editComment(wrongId)}).toThrow(new CommentNotFound());
        });
    });
});