import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  public editComment(data){
    return this.http.put<any>('/api/comment/edit', data);
  }

  public addComment(data){
    return this.http.post<any>('/api/comment/add', data);
  }

  public deleteComment(commentId: string, userId: string) {
    return this.http.delete(`/api/comment/delete/${commentId}/${userId}`);
  }

  public getAverageRate(productId: string) {
    return this.http.get<any>(`/api/comment/get/average/${productId}`)
  }

}
