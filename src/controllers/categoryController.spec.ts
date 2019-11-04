import {CategoryController} from "./categoryController";
import {SuccessResponse} from "../models/response/successResponse";
import * as Mocks from 'node-mocks-http';
import {Category} from "../models/category/category";
import {ErrorResponse} from "../models/response/errorResponse";
import {ProductNotFound} from "../errors/product/productNotFound";
import {CategoryNotFound} from "../errors/category/categoryNotFound";
import {CategoriesNotFound} from "../errors/category/categoriesNotFound";

describe('Category Controller Test' , () => {

    let categoryController: CategoryController;

    beforeEach(() => {
        categoryController = new CategoryController()
    });

    describe('getCategoryById function' , () => {
        let category: Category = {
            categoryId: '0',
            name: 'Category 1',
            description: 'description1',
            count: 0,
            products: [
                {
                    productId: '0',
                    name: 'Opel Araba',
                    price: 30,
                    description: 'yeni araba',
                    userId: 'hakan',
                    categoryId: '0',
                    image: 'image1',
                    imageType: 'png',
                    comments: null,
                    stock: true
                },
                {
                    productId: '1',
                    name: 'Fiat araba',
                    price: 50,
                    description: 'eski araba',
                    userId: 'harun',
                    categoryId: '0',
                    image: 'image1',
                    imageType: 'png',
                    comments: null,
                    stock: true
                }
            ]
        };
        describe('Success Response cases', () => {
            it('Response\'s status is 200', async () => {
                const req = Mocks.createRequest({params: {categoryId: 0}});
                const res = Mocks.createResponse();
                spyOn(categoryController.categoryBusiness, 'getCategoryById').and.returnValue(Promise.resolve(new SuccessResponse(category)));
                await categoryController.getCategoryById(req,res);
                expect(res.statusCode).toEqual(200);
            });
            it('Response\'s data is true', async () => {
                const req = Mocks.createRequest({params: {categoryId: 0}});
                const res = Mocks.createResponse();
                spyOn(categoryController.categoryBusiness, 'getCategoryById').and.returnValue(Promise.resolve(new SuccessResponse(category)));
                await categoryController.getCategoryById(req,res);
                expect(res._getData()).toEqual(new SuccessResponse(category));
            });
        });

        describe('Error Response Cases', () => {
            it('Response\'s status is 404', async () => {
                const req = Mocks.createRequest({params: {categoryId: -1}});
                const res = Mocks.createResponse();
                spyOn(categoryController.categoryBusiness, 'getCategoryById').and.returnValue(Promise.resolve(new ErrorResponse(new ProductNotFound())));
                await categoryController.getCategoryById(req,res);
                expect(res.statusCode).toEqual(404);
            });
            it('Response\'s status is 404', async () => {
                const req = Mocks.createRequest({params: {categoryId: -1}});
                const res = Mocks.createResponse();
                spyOn(categoryController.categoryBusiness, 'getCategoryById').and.returnValue(Promise.resolve(new ErrorResponse(new CategoryNotFound())));
                await categoryController.getCategoryById(req,res);
                expect(res.statusCode).toEqual(404);
            });
        });

    });

    describe('getCategories function' , () => {
        let expectedCategories: Category[] = [
            {
                categoryId: '0',
                name: 'Category 1',
                description: 'description1',
                products: null,
                count: 0
            },
            {
                categoryId: '1',
                name: 'Category 2',
                description: 'description2',
                products: null,
                count: 0
            }
        ];
        describe('Success Response cases', () => {
            it('Response\'s status is 200', async () => {
                const req = Mocks.createRequest();
                const res = Mocks.createResponse();
                spyOn(categoryController.categoryBusiness, 'getCategories').and.returnValue(Promise.resolve(new SuccessResponse(expectedCategories)));
                await categoryController.getCategories(req,res);
                expect(res.statusCode).toEqual(200);
            });
            it('Response\'s data is true', async () => {
                const req = Mocks.createRequest();
                const res = Mocks.createResponse();
                spyOn(categoryController.categoryBusiness, 'getCategories').and.returnValue(Promise.resolve(new SuccessResponse(expectedCategories)));
                await categoryController.getCategories(req,res);
                expect(res._getData()).toEqual(new SuccessResponse(expectedCategories));
            });
        });

        describe('Error Response Cases', () => {
            it('Response\'s status is 404', async () => {
                const req = Mocks.createRequest();
                const res = Mocks.createResponse();
                spyOn(categoryController.categoryBusiness, 'getCategories').and.returnValue(Promise.resolve(new ErrorResponse(new CategoriesNotFound())));
                await categoryController.getCategories(req,res);
                expect(res.statusCode).toEqual(404);
            });
        });

    });
});