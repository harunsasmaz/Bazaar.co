import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  currentUser: User;

  constructor(
    public router: Router,
    public authenticationService: AuthenticationService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    this.currentUser = this.authenticationService.currentUserValue;

    if(this.currentUser && (state.url === '/login' || state.url === '/register')){

      this.router.navigate(['/'] );
      return false;

    } else if (this.currentUser && (state.url !== '/login') && (state.url !== '/register')) {
      // logged in so return true
      return true;

    } else if(!this.currentUser && (state.url === '/login' || state.url === '/register')){
        // not logged in and trying to go login/register so return true
       return true;
    }

    // not logged in and  trying to reach other pages so redirect to login page with
    this.router.navigate(['/'] );
    return false;
  }
}
