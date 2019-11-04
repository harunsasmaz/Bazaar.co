import {ProductController} from "./productController";
import {Product} from "../models/product/product";
import {SuccessResponse} from "../models/response/successResponse";
import * as Mocks from "node-mocks-http";
import {ErrorResponse} from "../models/response/errorResponse";
import {InvalidInformation} from "../errors/validation/invalidInformation";
import {ProductNotFound} from "../errors/product/productNotFound";

describe('ProductController Test', () => {

    let productController,req,res;

    beforeAll(() => {
        productController = new ProductController();
    });

    describe('addProduct function', () => {

        describe('when a valid body is given',() => {
            let expected:Product = {productId:'testId' , name:'test', price:1 ,
                description:'test', userId:'test', categoryId:'test', image:'base64', imageType:'png', comments:null, stock: true};
            let body = {name:'test', price:1 ,
                description:'test', userId:'test', categoryId:'test', image:'base64', imageType:'png', stock: true};
            let response = new SuccessResponse(expected);
            beforeEach(() => {
               req = Mocks.createRequest({body: body});
               res = Mocks.createResponse();
            });

            it('should respond product data', async function () {
                spyOn(productController.productBusiness, 'addProduct')
                    .and.returnValue(Promise.resolve(response));
                await productController.addProduct(req,res);
                expect(res._getData()).toEqual(response);
            });

            it('should have status 200', async function () {
                spyOn(productController.productBusiness, 'addProduct')
                    .and.returnValue(Promise.resolve(response));
                await productController.addProduct(req,res);
                expect(res.statusCode).toEqual(200);
            });
        });

        describe('when an invalid body is given', () => {
            // name field is required
            let body = { price:1 , description:'test', userId:'test', categoryId:'test', image:'base64', imageType:'png' };

            beforeEach(() => {
                req = Mocks.createRequest({body: body});
                res = Mocks.createResponse();
            });

            it('should send a invalid information error', async function () {
                spyOn(productController.productBusiness, 'addProduct')
                    .and.returnValue(Promise.resolve(null));
                await productController.addProduct(req,res);
                expect(res._getData()).toEqual(new ErrorResponse(new InvalidInformation()));
            });

            it('should have status 400', async function () {
                spyOn(productController.productBusiness, 'addProduct')
                    .and.returnValue(Promise.resolve(null));
                await productController.addProduct(req,res);
                expect(res.statusCode).toEqual(400);
            });
        });
    });

    describe('updateProduct function', () => {
           describe('when a valid body is given', () => {
               let expected:Product = {productId:'testId' , name:'newName', price:10 , //price and name are updated
                   description:'test', userId:'test', categoryId:'test', image:'base64', imageType:'png', comments:null, stock: true};
               let body = {productId:'test', name:'newName', price:10, //price and name are updated
                   description:'test', userId:'test', categoryId:'test', image:'base64', imageType:'png', stock: true};
               let response = new SuccessResponse(expected);
               beforeEach(() => {
                   req = Mocks.createRequest({body: body});
                   res = Mocks.createResponse();
               });

               it('should respond updated product data', async function () {
                   spyOn(productController.productBusiness, 'updateProduct').and.returnValue(response);
                   await productController.updateProduct(req,res);
                   expect(res._getData()).toEqual(response);
               });

               it('should have status 200', async function () {
                   spyOn(productController.productBusiness, 'updateProduct').and.returnValue(response);
                   await productController.updateProduct(req,res);
                   expect(res.statusCode).toEqual(200);
               });
           });

           describe('when productId is not found in db', () => {
                let body = {productId:'notexist', name:'test', price:1,
                    description:'test', userId:'test', categoryId:'test', image:'base64', imageType:'png', stock: true};
                let response = new ErrorResponse(new ProductNotFound());
                beforeEach(() => {
                    req = Mocks.createRequest({body: body});
                    res = Mocks.createResponse();
                });

                it('should send product not found error', async function () {
                    spyOn(productController.productBusiness, 'updateProduct').and.returnValue(response);
                    await productController.updateProduct(req,res);
                    expect(res._getData()).toEqual(response);
                });

                it('should have status 404', async function () {
                    spyOn(productController.productBusiness, 'updateProduct').and.returnValue(response);
                    await productController.updateProduct(req,res);
                    expect(res.statusCode).toEqual(404);
                });
           });
    });

    describe('deleteProduct function', () => {

        describe('when an existing id is given', () => {
            let productId = 'existing';
            let response = new SuccessResponse(null);

            beforeEach(() => {
                req = Mocks.createRequest({body: {productId: productId}});
                res = Mocks.createResponse();
            });

            it('should respond with success response', async function () {
                spyOn(productController.productBusiness,'deleteProduct').and.returnValue(response);
                await productController.deleteProduct(req,res);
                expect(res._getData()).toEqual(response);
            });
            it('should have status 200', async function () {
                spyOn(productController.productBusiness,'deleteProduct').and.returnValue(response);
                await productController.deleteProduct(req,res);
                expect(res.statusCode).toEqual(200);
            });
        });

        describe('when non-existing id is given', () => {
            let productId = 'non-existing';
            let response = new ErrorResponse(new ProductNotFound());

            beforeEach(() => {
                req = Mocks.createRequest({body: {productId: productId}});
                res = Mocks.createResponse();
            });

            it('should send product not found error', async function () {
                spyOn(productController.productBusiness,'deleteProduct').and.returnValue(response);
                await productController.deleteProduct(req,res);
                expect(res._getData()).toEqual(response);
            });

            it('should have status 404', async function () {
                spyOn(productController.productBusiness,'deleteProduct').and.returnValue(response);
                await productController.deleteProduct(req,res);
                expect(res.statusCode).toEqual(404);
            });
        });

        describe('when productId field is not given in request body', () => {
            beforeEach(() => {
                req = Mocks.createRequest();
                res = Mocks.createResponse();
            });

            it('should have status different than 200', async function () {
                spyOn(productController.productBusiness,'deleteProduct').and.returnValue(null);
                await productController.deleteProduct(req,res);
                expect(res.statusCode).not.toEqual(200);
            });
        });
    });

    describe('getProductById function',() => {

        describe('when an existing id is given', () => {
            let expected: Product =  {productId:'testId' , name:'test', price:10 ,
                description:'test', userId:'test', categoryId:'test', image:'base64', imageType:'png', comments:[], stock: true};
            let response = new SuccessResponse(expected);
            beforeEach(() => {
                req = Mocks.createRequest({body: {productId: 'existing'}});
                res = Mocks.createResponse();
            });

            it('should respond with product data', async function () {
                spyOn(productController.productBusiness, 'getProductById').and.returnValue(response);
                await productController.getProductById(req,res);
                expect(res._getData()).toEqual(response);
            });

            it('should respond with status 200', async function () {
                spyOn(productController.productBusiness, 'getProductById').and.returnValue(response);
                await productController.getProductById(req,res);
                expect(res.statusCode).toEqual(200);
            });
        });

        describe('when non-existing id is given', () => {
            let productId = 'non-existing';
            let response = new ErrorResponse(new ProductNotFound());

            beforeEach(() => {
                req = Mocks.createRequest({body: {productId: productId}});
                res = Mocks.createResponse();
            });

            it('should send product not found error', async function () {
                spyOn(productController.productBusiness,'getProductById').and.returnValue(response);
                await productController.getProductById(req,res);
                expect(res._getData()).toEqual(response);
            });

            it('should have status 404', async function () {
                spyOn(productController.productBusiness,'getProductById').and.returnValue(response);
                await productController.getProductById(req,res);
                expect(res.statusCode).toEqual(404);
            });
        });

        describe('when productId field is not given in request body', () => {
            beforeEach(() => {
                req = Mocks.createRequest();
                res = Mocks.createResponse();
            });

            it('should have status different than 200', async function () {
                spyOn(productController.productBusiness,'getProductById').and.returnValue(null);
                await productController.getProductById(req,res);
                expect(res.statusCode).not.toEqual(200);
            });
        });
    });
});



