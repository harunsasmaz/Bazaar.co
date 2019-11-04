import {ProductBusiness} from "./productBusiness";
import {Product} from "../models/product/product";
import {Comment} from "../models/comment/comment";
import {SuccessResponse} from "../models/response/successResponse";
import {ProductCreateError} from "../errors/product/productCreateError";
import {ErrorResponse} from "../models/response/errorResponse";
import {ProductNotFound} from "../errors/product/productNotFound";
import {ProductUpdateError} from "../errors/product/productUpdateError";


describe('ProductBusiness Test', () => {

    let productBusiness: ProductBusiness;

    beforeAll(() => {
        productBusiness = new ProductBusiness();
    });

    describe('addProduct function', () => {
        let product:Product = {productId:null , name:'test', price:1 ,
            description:'test', userId:'test', categoryId:'test', image:'base64', imageType:'png', comments:null, stock: true};

        describe('with valid information', () => {
            let expected:Promise<Product> = Promise.resolve<Product>({productId:'testId' , name:'test', price:1 ,
                description:'test', userId:'test', categoryId:'test', image:'base64', imageType:'png', comments:null, stock: true});

            it('should send a success response', async () => {
                spyOn(productBusiness.productService, 'addProduct').and.callFake(() => { return expected });
                let result = await productBusiness.addProduct(product);
                expect(result instanceof SuccessResponse).toEqual(true);
            });
            it('should have status 200', async () => {
                spyOn(productBusiness.productService, 'addProduct').and.callFake(() => { return expected });
                let result = await productBusiness.addProduct(product);
                expect(result.status).toEqual(200);
            });
        });

        describe('Unexpected error occurred while adding', () => {
            it('should send a error response', async () => {
                spyOn(productBusiness.productService, 'addProduct').and.callFake(() => { throw new ProductCreateError()});
                let result = await productBusiness.addProduct(product);
                expect(result instanceof ErrorResponse).toEqual(true);
            });
            it('should have status 417', async () => {
                spyOn(productBusiness.productService, 'addProduct').and.callFake(() => { throw new ProductCreateError()});
                let result = await productBusiness.addProduct(product);
                expect(result.status).toEqual(417);
            });
        });
    });

    describe('updateProduct function', () => {
        let product:Product = {productId:'testId' , name:'updated', price:1 ,
            description:'updated', userId:'test', categoryId:'test', image:'base64', imageType:'png', comments:null, stock: true};

        describe('with valid information', () => {
            let expected:Promise<Product> = Promise.resolve<Product>({productId:'testId' , name:'updated', price:1 ,
                description:'updated', userId:'test', categoryId:'test', image:'base64', imageType:'png', comments:null, stock: true});

            it('should send a success response', async () => {
                spyOn(productBusiness.productService, 'updateProduct').and.callFake(() => { return expected });
                let result = await productBusiness.updateProduct(product, '');
                expect(result instanceof SuccessResponse).toEqual(true);
            });
            it('should have status 200', async () => {
                spyOn(productBusiness.productService, 'updateProduct').and.callFake(() => { return expected });
                let result = await productBusiness.updateProduct(product, '');
                expect(result.status).toEqual(200);
            });
        });

        describe('when product id not found in db', () => {
            it('should send a error response', async () => {
                spyOn(productBusiness.productService, 'updateProduct').and.callFake(() => { throw new ProductNotFound()});
                let result = await productBusiness.updateProduct(product, '');
                expect(result instanceof ErrorResponse).toEqual(true);
            });

            it('should have status 404', async () => {
                spyOn(productBusiness.productService, 'updateProduct').and.callFake(() => { throw new ProductNotFound()});
                let result = await productBusiness.updateProduct(product, '');
                expect(result.status).toEqual(404);
            });
        });

        describe('when invalid data given', () => {
            it('should send a error response', async () => {
                spyOn(productBusiness.productService, 'updateProduct').and.callFake(() => { throw new ProductUpdateError()});
                let result = await productBusiness.updateProduct(product, '');
                expect(result instanceof ErrorResponse).toEqual(true);
            });
            it('should have status 404', async () => {
                spyOn(productBusiness.productService, 'updateProduct').and.callFake(() => { throw new ProductUpdateError()});
                let result = await productBusiness.updateProduct(product, '');
                expect(result.status).toEqual(417);
            });
        });
    });

    describe('deleteProduct function', () => {
        describe('with an existing product id', () => {
            let productId = 'testId';
            it('should send a success response', async () => {
                spyOn(productBusiness.productService,'deleteProduct').and.returnValue(null);
                spyOn(productBusiness.commentService,'deleteCommentsByProductId').and.returnValue(null);
                let result = await productBusiness.deleteProduct(productId);
                expect(result instanceof SuccessResponse).toEqual(true);
            });
            it('should have status 200', async () => {
                spyOn(productBusiness.productService,'deleteProduct').and.returnValue(null);
                spyOn(productBusiness.commentService,'deleteCommentsByProductId').and.returnValue(null);
                let result = await productBusiness.deleteProduct(productId);
                expect(result.status).toEqual(200);
            });
        });

        describe('with non-existing product id', () => {
            let productId = 'this-does-not-exist';
            it('should send a success response', async () => {
                spyOn(productBusiness.productService,'deleteProduct').and.returnValue(null);
                spyOn(productBusiness.commentService,'deleteCommentsByProductId').and.returnValue(null);
                let result = await productBusiness.deleteProduct(productId);
                expect(result instanceof SuccessResponse).toEqual(true);
            });
            it('should have status 200', async () => {
                spyOn(productBusiness.productService,'deleteProduct').and.returnValue(null);
                spyOn(productBusiness.commentService,'deleteCommentsByProductId').and.returnValue(null);
                let result = await productBusiness.deleteProduct(productId);
                expect(result.status).toEqual(200);
            });
        });

        describe('when product id is given as null', () => {
            it('should send a success response', async () => {
                spyOn(productBusiness.productService,'deleteProduct').and.returnValue(null);
                spyOn(productBusiness.commentService,'deleteCommentsByProductId').and.returnValue(null);
                let result = await productBusiness.deleteProduct(null);
                expect(result instanceof SuccessResponse).toEqual(true);
            });
            it('should have status 200', async () => {
                spyOn(productBusiness.productService,'deleteProduct').and.returnValue(null);
                spyOn(productBusiness.commentService,'deleteCommentsByProductId').and.returnValue(null);
                let result = await productBusiness.deleteProduct(null);
                expect(result.status).toEqual(200);
            });
        });
    });

    describe('getById function', () => {
        let product:Product = {productId:'testId' , name:'test', price:1 ,
            description:'test', userId:'test', categoryId:'test', image:'base64', imageType:'png', comments:[], stock: true};

        describe('with an existing product id', () => {
            let productId = 'testId';
            it('should send a success response', async () => {
                spyOn(productBusiness.productService,'getProduct').and.returnValue(Promise.resolve<Product>(product));
                spyOn(productBusiness.commentService,'getCommentsByProductId').and.returnValue(Promise.resolve<Comment[]>([]));
                let result = await productBusiness.getProductById(productId);
                expect(result instanceof SuccessResponse).toEqual(true);
            });
            it('should have product data with comments', async () => {
                spyOn(productBusiness.productService,'getProduct').and.returnValue(Promise.resolve<Product>(product));
                spyOn(productBusiness.commentService,'getCommentsByProductId').and.returnValue(Promise.resolve<Comment[]>([]));
                let result = await productBusiness.getProductById(productId);
                expect(result.data).toEqual(product);
            });
        });

        describe('with a non-existing productId', () => {
            let productId = 'non-existing';
            it('should send an error response', async () => {
                spyOn(productBusiness.productService,'getProduct').and.callFake(() => {throw new ProductNotFound()});
                spyOn(productBusiness.commentService,'getCommentsByProductId').and.returnValue(Promise.resolve<Comment[]>([]));
                let result = await productBusiness.getProductById(productId);
                expect(result instanceof ErrorResponse).toEqual(true);
            });
            it('should have status 404', async () => {
                spyOn(productBusiness.productService,'getProduct').and.callFake(() => {throw new ProductNotFound()});
                spyOn(productBusiness.commentService,'getCommentsByProductId').and.returnValue(Promise.resolve<Comment[]>([]));
                let result = await productBusiness.getProductById(productId);
                expect(result.status).toEqual(404);
            });
        });

        describe('when productId is given null', () => {
            it('should send an error response', async () => {
                spyOn(productBusiness.productService,'getProduct').and.callFake(() => {throw new ProductNotFound()});
                spyOn(productBusiness.commentService,'getCommentsByProductId').and.returnValue(Promise.resolve<Comment[]>([]));
                let result = await productBusiness.getProductById(null);
                expect(result instanceof ErrorResponse).toEqual(true);
            });
            it('should have status 404', async () => {
                spyOn(productBusiness.productService,'getProduct').and.callFake(() => {throw new ProductNotFound()});
                spyOn(productBusiness.commentService,'getCommentsByProductId').and.returnValue(Promise.resolve<Comment[]>([]));
                let result = await productBusiness.getProductById(null);
                expect(result.status).toEqual(404);
            });
        });
    });
});
