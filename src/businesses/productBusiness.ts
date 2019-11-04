import {ProductService} from "../services/dbCRUDServices/productService";
import {SuccessResponse} from "../models/response/successResponse";
import {ErrorResponse} from "../models/response/errorResponse";
import {CommentService} from "../services/dbCRUDServices/commentService";
import {Product} from "../models/product/product";
import {ResponseModel} from "../models/response/responseModel";


export class ProductBusiness {

    productService: ProductService;
    commentService: CommentService;

    constructor(){
        this.productService = new ProductService();
        this.commentService = new CommentService();
    }

    public async addProduct(product: Product): Promise<ResponseModel> {
        try {
           let result = await this.productService.addProduct(product);
           return new SuccessResponse(result);
        } catch(error) {
            return new ErrorResponse(error);
        }
    }

    public async updateProduct(product: Product, caseNumber: string): Promise<ResponseModel> {
        try {
            let result = await this.productService.updateProduct(product, caseNumber);
            return new SuccessResponse(result);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    public async deleteProduct(productId: string): Promise<ResponseModel> {
        try {
            await this.productService.deleteProduct(productId);
            await this.commentService.deleteCommentsByProductId(productId);
            return new SuccessResponse(null);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }


    public async getProductById(productId: string): Promise<ResponseModel> {
        try {
            let product = await this.productService.getProduct(productId);
            product.comments = await this.commentService.getCommentsByProductId(productId);
            return new SuccessResponse(product);
        } catch (error) {
            return new ErrorResponse(error);
        }

    }

    public async getProductsByUserId(userId: string): Promise<ResponseModel> {
        try{
            let products = await this.productService.getProductsByUserId(userId);
            return new SuccessResponse(products);
        } catch(error){
            return new ErrorResponse(error);
        }
    }

}

