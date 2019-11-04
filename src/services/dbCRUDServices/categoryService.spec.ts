import {CategoryService} from "./categoryService";
import {Category} from "../../models/category/category";
import {CategoryNotFound} from "../../errors/category/categoryNotFound";

describe('Category Service Tests',()=>{
    let categoryService: CategoryService;

    beforeEach(() => {
        categoryService = new CategoryService();
    });
    describe('getCategoryById function', () => {
        let validId= '0';
        let wrongId = '-1';
        let min = '0';
        let max = '1';
        let savedCategory: Category = {
            name: 'category1',
            description: 'des',
            categoryId: '0',
            products: null,
            count: 1
        };
        it('It returns a category successfully when id is valid', async() => {
            spyOn(categoryService,'getCategoryById').and.callFake((categoryId: string, min: string, max: string): Promise<Category> => {
                if(categoryId === '0') return Promise.resolve(savedCategory);
                throw new CategoryNotFound();
            });
            let result = await categoryService.getCategoryById(validId, min, max);
            expect(result).toEqual(savedCategory);
        });
        it('It throws an error when id is invalid', async() => {
            spyOn(categoryService,'getCategoryById').and.callFake((categoryId: string): Promise<Category> => {
                if(categoryId === '0') return Promise.resolve(savedCategory);
                throw new CategoryNotFound();
            });
            expect(function() {categoryService.getCategoryById(wrongId, min, max)}).toThrow(new CategoryNotFound());
        });
    });

    describe('getCategories function', () => {
        let categories: Category[] = [
            {
                categoryId: '0',
                name: 'cat',
                description: 'des',
                products: null,
                count: 1
            }
        ];
        it('It returns categories successfully', async() => {
            spyOn(categoryService,'getCategories').and.callFake((): Promise<Category[]> => {
                return Promise.resolve(categories);
            });
            let result = await categoryService.getCategories();
            expect(result).toEqual(categories);
        });
    });
});