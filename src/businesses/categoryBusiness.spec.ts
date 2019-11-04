import {CategoryBusiness} from "./categoryBusiness";
import {Category} from "../models/category/category";
import {Product} from "../models/product/product";
import {ResponseModel} from "../models/response/responseModel";
import {SuccessResponse} from "../models/response/successResponse";
import {ProductNotFound} from "../errors/product/productNotFound";
import {ErrorResponse} from "../models/response/errorResponse";
import {CategoryNotFound} from "../errors/category/categoryNotFound";
import {CategoriesNotFound} from "../errors/category/categoriesNotFound";

describe('CategoryBusiness Tests' , () => {

    let categoryBusiness: CategoryBusiness;

    beforeEach(() => {
        categoryBusiness = new CategoryBusiness();
    });

    describe('getCategories function', () => {
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
        describe('SuccessResponse cases', () => {
            it('Returned value is SuccessResponse', async () => {
                spyOn(categoryBusiness.categoryService, 'getCategories').and.returnValue(Promise.resolve(expectedCategories));
                let result: ResponseModel = await categoryBusiness.getCategories();
                expect(result instanceof SuccessResponse).toEqual(true);
            });

            it('Response\'s status is 200', async () => {
                spyOn(categoryBusiness.categoryService, 'getCategories').and.returnValue(Promise.resolve(expectedCategories));
                let result: ResponseModel = await categoryBusiness.getCategories();
                expect(result.status).toEqual(200);
            });

            it('Response\'s data is true', async () => {
                spyOn(categoryBusiness.categoryService, 'getCategories').and.returnValue(Promise.resolve(expectedCategories));
                let result: ResponseModel = await categoryBusiness.getCategories();
                expect(result.data).toEqual(expectedCategories);
            });
        });

        describe('ErrorResponse cases', () => {
            it('Returned value is ErrorResponse', async () => {
                spyOn(categoryBusiness.categoryService, 'getCategories').and.callFake(() => {
                    throw new CategoriesNotFound();
                });
                let result: ResponseModel = await categoryBusiness.getCategories();
                expect(result instanceof ErrorResponse).toEqual(true);
            });

            it('Response\'s status is 404', async () => {
                spyOn(categoryBusiness.categoryService, 'getCategories').and.callFake(() => {
                    throw new CategoriesNotFound();
                });
                let result: ResponseModel = await categoryBusiness.getCategories();
                expect(result.status).toEqual(404);
            });
        });
    });

    describe('getCategoryById function' , () => {
        let expectedCategory: Category = {
            categoryId: '0',
            name: 'Category 1',
            description: 'description1',
            products: null,
            count: 0
        };
        let expectedProducts: Product[] = [
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
        ];
        let expectedReturnValue: Category = {
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
        describe('SuccessResponse cases' , () =>{
            it('Returned value is SuccessResponse', async () => {
                spyOn(categoryBusiness.categoryService, 'getCategoryById').and.returnValue(Promise.resolve(expectedCategory));
                spyOn(categoryBusiness.productService, 'getProductsByCategoryId').and.returnValue(Promise.resolve(expectedProducts));
                let result: ResponseModel = await categoryBusiness.getCategoryById('0','','','','','','');
                expect(result instanceof SuccessResponse).toEqual(true);
            });

            it('Response\'s status is 200', async () => {
                spyOn(categoryBusiness.categoryService, 'getCategoryById').and.returnValue(Promise.resolve(expectedCategory));
                spyOn(categoryBusiness.productService, 'getProductsByCategoryId').and.returnValue(Promise.resolve(expectedProducts));
                let result: ResponseModel = await categoryBusiness.getCategoryById('0','','','','','','');
                expect(result.status).toEqual(200);
            });

            it('Response\'s data is true', async () => {
                spyOn(categoryBusiness.categoryService, 'getCategoryById').and.returnValue(Promise.resolve(expectedCategory));
                spyOn(categoryBusiness.productService, 'getProductsByCategoryId').and.returnValue(Promise.resolve(expectedProducts));
                let result: ResponseModel = await categoryBusiness.getCategoryById('0','','','','','','');
                expect(result.data).toEqual(expectedReturnValue);
            });
        });

        describe('ErrorResponse cases', () => {
            it('Returned value is ErrorResponse', async () => {
                spyOn(categoryBusiness.categoryService, 'getCategoryById').and.returnValue(Promise.resolve(expectedCategory));
                spyOn(categoryBusiness.productService, 'getProductsByCategoryId').and.callFake((categoryId: string) => {
                    throw new ProductNotFound();
                });
                let result: ResponseModel = await categoryBusiness.getCategoryById('-5','','','','','','');
                expect(result instanceof ErrorResponse).toEqual(true);
            });

            it('Returned value is ErrorResponse', async () => {
                spyOn(categoryBusiness.categoryService, 'getCategoryById').and.callFake((categoryId: string) => {
                    throw new CategoryNotFound();
                });
                spyOn(categoryBusiness.productService, 'getProductsByCategoryId').and.returnValue(Promise.resolve(expectedProducts));
                let result: ResponseModel = await categoryBusiness.getCategoryById('-5','','','','','','');
                expect(result instanceof ErrorResponse).toEqual(true);
            });

            it('Response\'s status is 404(CategoryNotFound)', async () => {
                spyOn(categoryBusiness.categoryService, 'getCategoryById').and.callFake((categoryId: string) => {
                    throw new CategoryNotFound();
                });
                spyOn(categoryBusiness.productService, 'getProductsByCategoryId').and.returnValue(Promise.resolve(expectedProducts));
                let result: ResponseModel = await categoryBusiness.getCategoryById('-5','','','','','','');
                expect(result instanceof ErrorResponse).toEqual(true);
            });

            it('Response\'s status is 404(ProductNotFound)', async () => {
                spyOn(categoryBusiness.categoryService, 'getCategoryById').and.returnValue(Promise.resolve(expectedCategory));
                spyOn(categoryBusiness.productService, 'getProductsByCategoryId').and.callFake((categoryId: string) => {
                    throw new ProductNotFound();
                });
                let result: ResponseModel = await categoryBusiness.getCategoryById('-5','','','','','','');
                expect(result instanceof ErrorResponse).toEqual(true);
            });

        });
    });

    describe('createCategories function' , () => {
        let categories: Category[] = [
            {
                categoryId: '',
                name: 'category',
                description: 'desc',
                products: null,
                count: 0
            },
            {
                categoryId: '',
                name: 'category',
                description: 'desc',
                products: null,
                count: 0
            }
        ];
        describe('SuccessResponse cases' , () =>{
            it('It is executed successfully', () => {
                spyOn(categoryBusiness.categoryService, 'createOneCategory').and.callFake((category: Category): Promise<void> => {
                    return;
                });
                expect(() => {categoryBusiness.createCategories(categories)}).not.toThrow();
            })
        });
    });
});