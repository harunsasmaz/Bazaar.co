import {Category} from "../../models/category/category";
import {ModelMapping} from "../../models/mapping/modelMapping";

export class CategoryMapping implements ModelMapping{
    public map(categoryModel): Category {
        if(!categoryModel) return null;
        return {
            categoryId: categoryModel.categoryId || null,
            name: categoryModel.name || null,
            description: categoryModel.description || null,
            products: categoryModel.products || null,
            count: categoryModel.count || null
        };
    }
}
