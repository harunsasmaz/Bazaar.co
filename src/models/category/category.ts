import {Product} from "../product/product";

export interface Category{
    categoryId: string
    name: string
    description: string,
    count: number,
    products: Product[]
}
