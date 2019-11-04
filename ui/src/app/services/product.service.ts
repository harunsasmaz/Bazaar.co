import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getById(id:string){
    return  this.http.get<any>(`/api/product/get/${id}`);
  }

  public addProduct(body){
    return this.http.post<any>(`/api/product/add/`,body);
  }

  public editProduct(body, imageCase){
    return this.http.put<any>(`/api/product/edit/${imageCase}`,body);
  }

  public deleteProduct(userId:string, productId: string){
    return this.http.delete(`/api/product/delete/${productId}/${userId}`);
  }

}
