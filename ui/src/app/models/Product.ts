import {Comment} from './Comment';

export class Product {
    productId: string;
    name:string;
    price:number;
    description:string;
    userId:string;
    categoryId:string;
    image:string;
    imageType:string;
    comments: Comment[];
    stock: boolean;

}
