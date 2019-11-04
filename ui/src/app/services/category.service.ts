import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public getCategories(){
    return this.http.get<any>(`/api/categories`);
  }

  public getCategoryById(categoryId: string, field: string, order: string, skip: string, limit: string, min: number, max: number){
    let minString = String(min);
    let maxString = String(max);
    return this.http.get<any>(`api/category/${categoryId}/${field}/${order}/${skip}/${limit}/${minString}/${maxString}`);
  }

}
