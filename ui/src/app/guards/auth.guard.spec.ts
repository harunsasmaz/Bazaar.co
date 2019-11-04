import {TestBed, getTestBed} from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/auth.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {User} from "../models/User";

let mockRouter: any = {
  navigate: (path: string) => {}
};

let routeMock: any = { snapshot: {}};

class mockAuth{
  user: User = {
    userId: 'hakan',
    name: 'hakan',
    surname: 'sivuk',
    gender: 'F',
    email: 'test@test.test',
    password: 'Test123',
    token: 'token'
  };
  get currentUserValue(){
    return this.user;
  }
}

let mockState: any = {
  url: '/'
};

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let injector: TestBed;
  let authService: AuthenticationService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {provide: Router, useValue: mockRouter},
        {provide: AuthenticationService, useClass: mockAuth}
      ],
      imports: [HttpClientTestingModule]
    });
    injector = getTestBed();
    authService = injector.get(AuthenticationService);
    guard = injector.get(AuthGuard);
  });


  it('should to be truthy', function () {
    expect(guard).toBeTruthy();
  });

  it('should return false if user is logged in and url is register', () => {
    mockState.url = '/register';
    let result = guard.canActivate(routeMock, mockState);
    expect(result).toEqual(false);
  });

  it('should return true if user is logged in and url is not register or login', () => {
    mockState.url = '/profile';
    let result = guard.canActivate(routeMock, mockState);
    expect(result).toEqual(true);
  });

  it('should return true if user is not logged in and url is login', () => {
    spyOnProperty(guard.authenticationService, 'currentUserValue','get').and.returnValue(null);
    mockState.url = '/login';
    let result = guard.canActivate(routeMock, mockState);
    expect(result).toEqual(true);
  });

  it('should call navigate function if user is not logged in', () => {
    spyOnProperty(guard.authenticationService, 'currentUserValue','get').and.returnValue(null);
    spyOn(guard.router, 'navigate').and.callThrough();
    mockState.url = '/profile';
    let result = guard.canActivate(routeMock, mockState);
    expect(guard.router.navigate).toHaveBeenCalled();
  });


});
