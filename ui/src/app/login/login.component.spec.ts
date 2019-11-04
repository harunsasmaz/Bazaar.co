import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';

class MockBuilder {
  private form = new FormBuilder();
  group(config) {
    return this.form.group(config);
  }
}

class MockAuth {
  login(email:string, password:string){
    if(email !== 'test@test.com' || password !== 'test'){
      return throwError('Wrong password or email');
    }
    return new Observable(observer => observer.next(1));
  }
}

class MockRoute {
  snapshot = { queryParams: {returnUrl: '/'}}
}

class MockRouter {
  navigate(path) {}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [{provide: AuthenticationService, useClass: MockAuth},
        {provide: ActivatedRoute, useClass: MockRoute},
        {provide: Router, useClass: MockRouter},
        {provide: FormBuilder, useClass: MockBuilder},
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, 'successFunction').and.callFake(() => {});
    spyOn(component, 'errorFunction').and.callFake(() => {});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form', function() {
    expect(component.loginForm).not.toBe(undefined);
  });

  it('should have error if email or password is wrong', function() {
    component.loginForm.controls.email.setValue('test@tet.com');
    component.loginForm.controls.password.setValue('test');
    component.onSubmit();
    expect(component.error).toEqual('Wrong password or email');
  });

  it('should not have error if email or password is correct', function() {
    component.loginForm.controls.email.setValue('test@test.com');
    component.loginForm.controls.password.setValue('test');
    component.onSubmit();
    expect(component.error).toEqual('');
  });

  it('should set submitted to true when onSubmit() is called', function() {
    component.loginForm.controls.email.setValue('test@test.com');
    component.loginForm.controls.password.setValue('test');
    component.onSubmit();
    expect(component.submitted).toEqual(true);
  });

  it('should set loading to true if form is valid', function() {
    component.loginForm.controls.email.setValue('test@test.com');
    component.loginForm.controls.password.setValue('test');
    component.onSubmit();
    expect(component.loading).toEqual(true);
  });

  it('should navigate to homepage if email and password are correct', function() {
      component.loginForm.controls.email.setValue('test@test.com');
      component.loginForm.controls.password.setValue('test');
      component.onSubmit();
      expect(component.successFunction).toHaveBeenCalled();
  });

  it('should return if form is invalid', function() {
      component.loginForm.controls.email.setValue('');
      component.loginForm.controls.password.setValue('test');
      component.onSubmit();
      expect(component.loading).toEqual(false);
  });

});
