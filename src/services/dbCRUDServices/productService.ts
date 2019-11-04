import {ProductModel} from "../../models/product/productModel";
import {Product} from "../../models/product/product";
import {ProductCreateError} from "../../errors/product/productCreateError";
import * as id from 'uuid/v1'
import {ProductUpdateError} from "../../errors/product/productUpdateError";
import {ProductNotFound} from "../../errors/product/productNotFound";
import {ProductDeleteError} from "../../errors/product/productDeleteError";
import {ProductMapping} from "../mappings/productMapping";
import * as fs from "fs";
import * as path from "path";


export class ProductService {

    private async decodeBase64(productId: string, image: string, imageType: string){
        let response = {
            type: imageType.split('/')[1],
            data: new Buffer(image, 'base64')
        };
        const fileName = productId + '.' + response.type;
        const directory = path.join(__dirname, '../../..' ,'\\src\\data\\images\\', fileName);
        await fs.writeFile(directory, response.data, (err) => {
            if(err){
                throw err;
            }
        });
        return 'http://' + 'localhost' + ':3000/images/' + productId + '.' + response.type;
    }

    public async addProduct(productInfo: Product):Promise<Product> {
        try {
            let newProduct = new ProductModel(productInfo);
            newProduct.productId = id();
            newProduct.image = await this.decodeBase64(newProduct.productId, productInfo.image, productInfo.imageType);
            let result = await newProduct.save();
            return (new ProductMapping()).map(result);
        } catch (err) {
            throw new ProductCreateError();
        }
    }

    public async updateProduct(productInfo: Product, caseNumber: string): Promise<Product> {
        try {
            let data;
            if(caseNumber === '0'){
                data = {
                    name: productInfo.name,
                    price: productInfo.price,
                    description: productInfo.description,
                    categoryId: productInfo.categoryId,
                    stock: productInfo.stock
                };
            } else {
                data = {
                    name: productInfo.name,
                    price: productInfo.price,
                    description: productInfo.description,
                    categoryId: productInfo.categoryId,
                    image: await this.decodeBase64(productInfo.productId, productInfo.image, productInfo.imageType),
                    imageType: productInfo.imageType,
                    stock: productInfo.stock
                };
            }

            let result = await ProductModel.findOneAndUpdate({productId: productInfo.productId}, data , {new:true} );
            if(!result) throw new ProductNotFound();
            return (new ProductMapping()).map(result);
        } catch (err) {
            throw new ProductUpdateError();
        }
    }


    public async deleteProduct(productId: string): Promise<void> {
        try {
            const product = await ProductModel.findOne({productId: productId});
            await ProductModel.deleteOne({productId: productId});
            const fileName = productId + '.' + product.imageType.split('/')[1];
            const target = path.join(__dirname, '../../..' ,'\\src\\data\\images\\', fileName);
            await fs.unlink(target, (err) => {
                if(err){
                    throw err;
                }
            })
        } catch (e) {
            throw new ProductDeleteError();
        }
    }

    public async getProductsByCategoryId(categoryId: string, field: string, order: string, skip: string, limit: string, min:string, max:string): Promise<Product[]> {
        try {
            let result;
            if( field === 'name') {
                result = await ProductModel.find({categoryId: categoryId, price: { $gte: Number(min), $lte: Number(max)}}).sort({name: order}).skip(Number(skip)).limit(Number(limit));
            }
            else if( field === 'price') {
                result = await ProductModel.find({categoryId: categoryId, price: { $gte: Number(min), $lte: Number(max)}}).sort({price: order}).skip(Number(skip)).limit(Number(limit));
            }
            else{
                result = await ProductModel.find({categoryId: categoryId, price: { $gte: Number(min), $lte: Number(max)}}).sort({rating: order}).skip(Number(skip)).limit(Number(limit));
            }
            let products: Product[] = [];
            const mapping = new ProductMapping();
            for(let i = 0 ; i < result.length ; i++){
                products.push(mapping.map(result[i]));
            }
            return products;
        } catch (e) {
            throw new ProductNotFound();
        }
    }

    public async getProduct(productId: string): Promise<Product> {

        try {
            let result = await ProductModel.findOne({productId: productId});
            if(!result) throw new ProductNotFound();
            return (new ProductMapping()).map(result);
        } catch (err) {
            throw new ProductNotFound();
        }
    }

    public async getCount(categoryId: string, min: string, max: string): Promise<number> {
        try{
            let result = await ProductModel.countDocuments({categoryId: categoryId, price: { $gte: Number(min), $lte: Number(max)}});
            return result;
        }
        catch(err){
            throw new ProductNotFound();
        }
    }

    public async getProductsByUserId(userId: string): Promise<Product[]> {
        try{
            let result = await ProductModel.find({userId: userId});
            let products: Product[] = [];
            const mapping = new ProductMapping();
            for(let i = 0 ; i < result.length ; i++){
                products.push(mapping.map(result[i]));
            }
            return products;
        } catch(error) {
            throw new ProductNotFound();
        }
    }


}
