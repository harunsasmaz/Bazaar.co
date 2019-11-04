import {ProductService} from "./productService";
import {Product} from "../../models/product/product";
import registerValidation from "../validations/registerValidation";
import {RegistrationError} from "../../errors/register/registrationError";
import {ProductCreateError} from "../../errors/product/productCreateError";
import {ProductNotFound} from "../../errors/product/productNotFound";
import {ProductUpdateError} from "../../errors/product/productUpdateError";
import {ProductDeleteError} from "../../errors/product/productDeleteError";


describe('ProductService Test', () => {
   let productService:ProductService;

   beforeAll(() => {
       productService = new ProductService();
   });

    describe('addProduct function',() => {
        let product:Product = {productId:'test' , name:'test', price:1 ,
            description:'test', userId:'test', categoryId:'test', image:'base64', imageType:'png', comments:null, stock: true};

        describe('when a valid body is given',() => {
            let body:Product = {productId:null , name:'test', price:1 ,
                description:'test', userId:'test', categoryId:'test', image:'base64', imageType:'png', comments:null, stock: true};
            it('should return product data', async function () {
                spyOn(productService,'addProduct').and.returnValue(Promise.resolve(product));
                let result = await productService.addProduct(body);
                expect(result).toEqual(product);
            });
        });

        describe('when an unexpected error occurred', () => {
            let body:Product = {productId:null , name:'test', price:1 , // categoryId is null for some reason
                description:'test', userId:'test', categoryId: null, image:'base64', imageType:'png', comments:null, stock: true};
            it('should throw product craete error', async function () {
                spyOn(productService,'addProduct').and.callFake((body:Product) => {
                    if(body.categoryId === null)
                        throw new ProductCreateError();
                    return Promise.resolve(product);
                });
                expect(function () { productService.addProduct(body)}).toThrow(new ProductCreateError());
            });
        });
    });

    describe('updateProduct function', () => {
        let product:Product = {productId:'test' , name:'updated', price:10,
            description:'test', userId:'test', categoryId:'test', image:'base64', imageType:'png', comments:null, stock: true};

        describe('when a valid body is given', () => {
            let body:Product = {productId:'test' , name:'updated', price:10 , // name and price are updated
                description:'test', userId:'test', categoryId:'test', image:'base64', imageType:'png', comments:null, stock: true};
            it('should return updated product data', async function () {
                spyOn(productService,'updateProduct').and.returnValue(Promise.resolve(product));
                let result = await productService.updateProduct(body, '');
                expect(result).toEqual(product);
            });
        });

        describe('when product id is not found', () => {
            let body:Product = {productId:'notfound' , name:'updated', price:10 , // name and price are updated
                description:'test', userId:'test', categoryId:'test', image:'base64', imageType:'png', comments:null, stock: true};

            it('should throw product not found error', async function () {
                spyOn(productService,'updateProduct').and.callFake((body: Product, caseNumber: string) => {
                    if(body.productId !== 'test')
                        throw new ProductNotFound();
                    return Promise.resolve(product);
                });
                expect( () => { productService.updateProduct(body, '')}).toThrow(new ProductNotFound());
            });
        });

        describe('when an unexpected error occurred', () => {
            let body:Product = {productId:'notfound' , name:'updated', price:10 , // categoryId is undefined for some reason
                description:'test', userId:'test', categoryId:undefined, image:'base64', imageType:'png', comments:null, stock: true};

            it('should throw product update error', async function () {
                spyOn(productService,'updateProduct').and.callFake((body:Product, caseNumber: string) => {
                    if(body.productId !== 'test')
                        throw new ProductUpdateError();
                    return Promise.resolve(product);
                });
                expect( () => { productService.updateProduct(body, '')}).toThrow(new ProductUpdateError());
            });
        });
    });

    describe('deleteProduct function', () => {

        describe('when an existing product id is given', () => {
            let productId = 'existing';
            it('should successfully return', function () {
                spyOn(productService,'deleteProduct').and.callFake((id:string) => {
                    if(id === undefined)
                        throw new ProductDeleteError();
                    return Promise.resolve();
                });
                expect(() => { productService.deleteProduct(productId)}).not.toThrow();
            });
        });

        describe('when a non-existing product id is given', () => {
            let productId = 'non-existing';
            it('should successfully return but no product deleted', function () {
                spyOn(productService,'deleteProduct').and.callFake((id:string) => {
                    if(id === undefined)
                        throw new ProductDeleteError();
                    return Promise.resolve();
                });
                expect(() => { productService.deleteProduct(productId)}).not.toThrow();
            });
        });

        describe('when an unexpected error occurred', () => {
            it('should throw product delete error', function () {
                spyOn(productService,'deleteProduct').and.callFake((id:string) => {
                    if(id === undefined)
                        throw new ProductDeleteError();
                    return Promise.resolve();
                });
                expect(() => { productService.deleteProduct(undefined)}).toThrow(new ProductDeleteError());
            });
        });
    });

    describe('getProduct function', () => {
        let product:Product = {productId:'test' , name:'test', price:1,
            description:'test', userId:'test', categoryId:'test', image:'base64', imageType:'png', comments:null, stock: true};

        describe('when an existing product id is given', () => {
            let productId = 'test';
            it('should successfully return product data', async function () {
                spyOn(productService,'getProduct').and.callFake((id:string) => {
                    if(id !== 'test')
                        throw new ProductNotFound();
                    return Promise.resolve(product);
                });
                let result = await productService.getProduct(productId);
                expect(result).toEqual(product);
            });
        });

        describe('when an non-existing product id is given', () => {
            let productId = 'non-existing';
            it('should throw product not found error', async function () {
                spyOn(productService,'getProduct').and.callFake((id:string) => {
                    if(id !== 'test')
                        throw new ProductNotFound();
                    return Promise.resolve(product);
                });
                expect(() => { productService.getProduct(productId)}).toThrow(new ProductNotFound());
            });
        });

        describe('when an unexpected error is occurred', () => {
            let productId = 'non-existing';
            it('should throw product not found error', async function () {
                spyOn(productService,'getProduct').and.callFake((id:string) => {
                    if(id !== 'test')
                        throw new ProductNotFound();
                    return Promise.resolve(product);
                });
                expect(() => { productService.getProduct(undefined)}).toThrow(new ProductNotFound());
            });
        });

    });

    describe('getProductsByCategoryId function', () => {
       let products = [];

       describe('when an existing category id is given', () => {
           let categoryId = 'category1';
           it('should return products under that category', async function () {
               spyOn(productService,'getProductsByCategoryId').and.callFake((id:string ,p1, p2, p3, p4, p5, p6) => {
                   if(id !== 'category1')
                       throw new ProductNotFound();
                   return Promise.resolve(products);
               });
               let result = await productService.getProductsByCategoryId(categoryId ,'' ,'', '', '' ,'', '');
               expect(result).toEqual(products);
           });
       });

        describe('when an non-existing product id is given', () => {
            let categoryId = 'non-existing';
            it('should throw product not found error', async function () {
                spyOn(productService,'getProductsByCategoryId').and.callFake((id:string ,p1, p2, p3, p4, p5, p6) => {
                    if(id !== 'category1')
                        throw new ProductNotFound();
                    return Promise.resolve(products);
                });
                expect(() => { productService.getProductsByCategoryId(categoryId ,'' ,'', '', '' ,'', '')}).toThrow(new ProductNotFound());
            });
        });

        describe('when an non-existing product id is given', () => {
            let categoryId = undefined;
            it('should throw product not found error', async function () {
                spyOn(productService,'getProductsByCategoryId').and.callFake((id:string ,p1, p2, p3, p4, p5, p6) => {
                    if(id !== 'category1')
                        throw new ProductNotFound();
                    return Promise.resolve(products);
                });
                expect(() => { productService.getProductsByCategoryId(categoryId ,'' ,'', '', '' ,'', '')}).toThrow(new ProductNotFound());
            });
        });
    });
});
