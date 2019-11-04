import {CategoryService} from "../services/dbCRUDServices/categoryService";
import {SuccessResponse} from "../models/response/successResponse";
import {ErrorResponse} from "../models/response/errorResponse";
import {ProductService} from "../services/dbCRUDServices/productService";
import {Category} from "../models/category/category";
import {ResponseModel} from "../models/response/responseModel";

export class CategoryBusiness {
    categoryService: CategoryService;
    productService: ProductService;

    constructor(){
        this.categoryService = new CategoryService();
        this.productService = new ProductService();
    }

    public createCategories(categories: Category[]): void {
        for(let i = 0 ; i < 5 ; i++){
            this.categoryService.createOneCategory(categories[i]);
        }
    }

    public async getCategories(): Promise<ResponseModel> {
        try {
            let result: Category[] = await this.categoryService.getCategories();
            return new SuccessResponse(result);
        } catch(error){
            return new ErrorResponse(error);
        }
    }

    public async getCategoryById(categoryId: string, field: string, order: string, skip: string, limit: string, min:string, max: string): Promise<ResponseModel>{
        try {
            let category: Category = await this.categoryService.getCategoryById(categoryId, min, max);
            category.products = await this.productService.getProductsByCategoryId(categoryId, field, order, skip, limit, min, max);
            return new SuccessResponse(category);
        } catch(error){
            return new ErrorResponse(error);
        }
    }

}
