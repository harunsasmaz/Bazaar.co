import {Product} from "../../models/product/product";
import {ModelMapping} from "../../models/mapping/modelMapping";

export class ProductMapping implements ModelMapping{
    public map(productModel): Product {
        if(!productModel) return null;
        return {
            productId: productModel.productId || null,
            name: productModel.name || null,
            price: productModel.price || null,
            description: productModel.description || null,
            userId: productModel.userId || null,
            categoryId: productModel.categoryId || null,
            image: productModel.image || null,
            imageType: productModel.imageType || null,
            comments: productModel.comments || null,
            stock: productModel.stock || false
        }
    }
}
