import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from '../services/auth.service';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {User} from '../models/User';

class MockBuilder {
  private form = new FormBuilder();
  group(config) {
    return this.form.group(config);
  }
}

class MockAuth {
  get currentUserValue():User {
    return {name:'test', surname:'test', gender:'U', email:'test@test.com', password:'test', userId:'test', token:'token'};
  }
  updateCurrentUser(data){}
}

class MockRouter {
  navigate(path) {}
}

class MockUser {
  updatePassword(data){
    if(data.userId === ''){
      return throwError('Could not update password');
    }
    return new Observable(observer => observer.next(1));
  }
  
  updateInfo(data){
    if(data.userId === '' || data.name === '' || data.surname === '' || data.gender === ''){
      return throwError('Could not update ');
    }
    return new Observable(observer => observer.next(1));
  }
}

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [ReactiveFormsModule, FormsModule],
      providers:[
        {provide: FormBuilder, useClass: MockBuilder},
        {provide: Router, useClass: MockRouter},
        {provide: AuthenticationService, useClass: MockAuth},
        {provide: UserService, useClass: MockUser},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, 'successFunction').and.callFake(() => {});
    spyOn(component, 'errorFunction').and.callFake(() => {});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have info update form', function() {
        expect(component.infoForm).not.toBe(undefined);
  });

  it('should have password update form', function() {
    expect(component.passwordForm).not.toBe(undefined);
  });

  it('should have open password tab when changePasswordButton() called ', function() {
    component.changePasswordButton();
    expect(component.status).toEqual('changePassword');
  });

  it('should have open user tab when userInfoButton() called ', function() {
    component.userInfoButton();
    expect(component.status).toEqual('userInfo');
  });

  it('get f() should get info form controls', function() {
    expect(component.formInfo).toEqual(component.infoForm.controls);
  });

  it('get fPsw() should password form controls', function() {
    expect(component.formPassword).toEqual(component.passwordForm.controls);
  });

  it('should have current user object ', function() {
    expect(component.currentUser).not.toBe(undefined);
  });

  it('should set info_submitted to true when onSubmitInfo() called', function() {
    component.onSubmitInfo();
    expect(component.info_submitted).toEqual(true);
  });

  it('should set psw_submitted to true when onSubmitInfo() called', function() {
    component.onSubmitPassword();
    expect(component.psw_submitted).toEqual(true);
  });

  it('should set info_loading to true when info form is valid', function() {
    component.infoForm.controls.name.setValue('harun');
    component.infoForm.controls.surname.setValue('sasmaz');
    component.infoForm.controls.gender.setValue('M');
    component.onSubmitInfo();
    expect(component.info_loading).toEqual(true);
  });

  it('should set psw_loading to true when password form is valid', function() {
    component.passwordForm.controls.oldPsw.setValue('Test12');
    component.passwordForm.controls.newPsw.setValue('Test123');
    component.passwordForm.controls.confirmPsw.setValue('Test123');
    component.onSubmitPassword();
    expect(component.psw_loading).toEqual(true);
  });

  it('should return when password form is invalid', function() {
    component.passwordForm.controls.oldPsw.setValue('');
    component.passwordForm.controls.newPsw.setValue('Test123');
    component.passwordForm.controls.confirmPsw.setValue('Test123');
    component.onSubmitPassword();
    expect(component.psw_loading).toEqual(false);
  });

  it('should return when user info form is invalid', function() {
    component.infoForm.controls.name.setValue('');
    component.infoForm.controls.surname.setValue('test');
    component.infoForm.controls.gender.setValue('U');
    component.onSubmitInfo();
    expect(component.info_loading).toEqual(false);
  });

  it('should have error when an error occurred in service info function', function() {
    component.currentUser.userId = '';
    component.infoForm.controls.name.setValue('test');
    component.infoForm.controls.surname.setValue('test');
    component.infoForm.controls.gender.setValue('U');
    component.onSubmitInfo();
    expect(component.error_of_info).not.toEqual('');
  });

  it('should have error when an error occurred in service password function', function() {
    component.currentUser.userId = '';
    component.passwordForm.controls.oldPsw.setValue('Test12');
    component.passwordForm.controls.newPsw.setValue('Test123');
    component.passwordForm.controls.confirmPsw.setValue('Test123');
    component.onSubmitPassword();
    expect(component.error_of_psw).not.toEqual('');
  });

  it('should return when new password and confirm password mismatched', function() {
    component.passwordForm.controls.oldPsw.setValue('Test12');
    component.passwordForm.controls.newPsw.setValue('Test123');
    component.passwordForm.controls.confirmPsw.setValue('Test12');
    component.onSubmitPassword();
    expect(component.psw_loading).not.toEqual(true);
  });

  it('should disable submit button when a required field is empty', function() {
    component.formPassword.oldPsw.setValue('');
    component.formPassword.newPsw.setValue('Test123');
    component.formPassword.confirmPsw.setValue('Test12');
    expect(component.pswSubmitDisableStatus()).toEqual(true);
  });

});
