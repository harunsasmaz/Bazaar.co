import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from "../services/user.service";
import {Observable, throwError} from "rxjs";


class MockBuilder {
  private form = new FormBuilder();
  group(config) {
    return this.form.group(config);
  }
}

class MockGroup {
  controls: {
    name: {value: ''},
    surname: {value: ''},
    gender: {value: 'M'},
    email: {value: ''},
    password: {value: ''},
    passwordCheck: {value: ''}
  };
  invalidCheck = () => { return this.controls.name.value === ''
      || this.controls.surname.value === ''
      || this.controls.email.value === ''
      || this.controls.password.value === ''
      || this.controls.passwordCheck.value === '' };
  invalid = this.invalidCheck();
}

class MockUserService {
  register(data){
    if (data.email === 'hakansivuk@gmail.com') return throwError('Email is already in use');
    return new Observable(observer => observer.next(2));
  }
}

class MockRouter {
  navigate(path: string){}
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        {provide: Router, useClass: MockRouter},
        {provide: FormBuilder, useClass: MockBuilder},
        {provide: FormGroup, useClass: MockGroup},
        {provide: UserService, useClass: MockUserService}
      ]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, 'successFunction').and.callFake(() => {});
    spyOn(component, 'errorFunction').and.callFake(() => {});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form', function() {
    expect(component.userForm).not.toBe(undefined);
  });

  it('should not submit if some fields dont exist', function() {
    component.userForm.controls.name.setValue('test');
    component.userForm.controls.surname.setValue('test');
    component.userForm.controls.email.setValue('test@test.test');
    component.onSubmit();
    expect(component.loading).toEqual(false);
  });

  it('should not submit if passwords dont match', function() {
    component.userForm.controls.name.setValue('test');
    component.userForm.controls.surname.setValue('test');
    component.userForm.controls.email.setValue('test@test.test');
    component.userForm.controls.password.setValue('Test123');
    component.userForm.controls.passwordCheck.setValue('Test12');
    component.onSubmit();
    expect(component.loading).toEqual(false);
  });

  it('should not submit if email is already in use', function() {
    component.userForm.controls.name.setValue('test');
    component.userForm.controls.surname.setValue('test');
    component.userForm.controls.gender.setValue('U');
    component.userForm.controls.email.setValue('hakansivuk@gmail.com');
    component.userForm.controls.password.setValue('Test123');
    component.userForm.controls.passwordCheck.setValue('Test123');
    component.onSubmit();
    expect(component.error).toEqual('Email is already in use');
  });


  it('shoul submit if everything is ok', function() {
    component.userForm.controls.name.setValue('test test');
    component.userForm.controls.surname.setValue('test');
    component.userForm.controls.gender.setValue('U');
    component.userForm.controls.email.setValue('test@test.test');
    component.userForm.controls.password.setValue('Test123');
    component.userForm.controls.passwordCheck.setValue('Test123');
    component.onSubmit();
    expect(component.error).toEqual('');
  });

  it('should set submitted to true when onSubmit() is called', function() {
    component.userForm.controls.name.setValue('test');
    component.userForm.controls.surname.setValue('test');
    component.userForm.controls.gender.setValue('U');
    component.userForm.controls.email.setValue('test@test.test');
    component.userForm.controls.password.setValue('Test123');
    component.userForm.controls.passwordCheck.setValue('Test123');
    component.onSubmit();
    expect(component.submitted).toEqual(true);
  });

});
