import {CategoryModel} from "../../models/category/categoryModel";
import {CategoryNotFound} from "../../errors/category/categoryNotFound";
import {CategoriesNotFound} from "../../errors/category/categoriesNotFound";
import * as id from 'uuid/v1';
import {Category} from "../../models/category/category";
import {CategoryCreateError} from "../../errors/category/categoryCreateError";
import {CategoryMapping} from "../mappings/categoryMapping";
import {ProductService} from "./productService";

export class CategoryService {

    productService: ProductService;

    constructor(){
        this.productService = new ProductService();
    }

    public async createOneCategory(categoryInfo: Category): Promise<void> {
        const newCategory = new CategoryModel(categoryInfo);
        newCategory.categoryId = id();
        await newCategory.save((err) => {
            if(err){
                return;
            }
        })
    }

    public async getCategories(): Promise<Category[]> {
        try{
            let categoryModels = await CategoryModel.find({});
            let categories : Category[] = [];
            const mapping = new CategoryMapping();
            for(let i = 0 ; i < categoryModels.length ; i++){
                categories.push(mapping.map(categoryModels[i]));
            }
            return categories;
        } catch(err){
            throw new CategoriesNotFound();
        }
    }


    public async getCategoryById(categoryId: string, min: string, max: string): Promise<Category>{
        try {
            let result: Category = await CategoryModel.findOne({categoryId: categoryId});
            if(!result) throw new CategoryNotFound();
            let category = (new CategoryMapping()).map((result));
            category.count = await this.productService.getCount(categoryId, min, max);
            return category;
        } catch(err){
            throw new CategoryNotFound();
        }
    }

    // to clear categories to check category initialization
    public deleteAll() {
        CategoryModel.remove({}, () => {
            console.log(`Removed`);
        });
    }
}
