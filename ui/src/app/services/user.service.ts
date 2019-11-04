import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../models/User';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }


  getById(id: string) {
    return this.http.get<any>(`/api/user/${id}`);
  }

  register(user) {
    return this.http.post(`/api/register`, user);
  }

  updateInfo(data) {
    return this.http.put(`/api/user/userInfo`, data);
  }

  updatePassword(data) {
    return this.http.put(`/api/user/password`, data);
  }

  delete(id: string) {
    return this.http.delete(`/api/user/${id}`);
  }

  getProducts(id :string){
    return this.http.get<any>(`/api/product/user/${id}`);
  }
}
