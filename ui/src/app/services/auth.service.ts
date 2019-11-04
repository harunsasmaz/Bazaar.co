import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`/api/login`, { email, password })
      .pipe(map(response => {
        // login successful if there's a jwt token in the response
        // In the returning data, there is a field named data,
        // and it stores information of user and token.
        if (response.data && response.data.token) {
          const user = {
            userId: response.data.userId,
            name: response.data.name,
            surname: response.data.surname,
            gender: response.data.gender,
            email: response.data.email,
            password: response.data.password,
            token: response.data.token
          };
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return response.data;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  updateCurrentUser(res){
    const user = {
      userId: this.currentUserValue.userId,
      name : res.data.name,
      surname : res.data.surname,
      gender : res.data.gender,
      email : this.currentUserValue.email,
      password : this.currentUserValue.password,
      token : this.currentUserValue.token
    };
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}
