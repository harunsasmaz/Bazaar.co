import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import {first} from "rxjs/operators";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  infoForm: FormGroup;
  passwordForm: FormGroup;
  currentUser: User;
  passwordPattern: '^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{6,}$';
// submit check of forms
  info_submitted = false;
  psw_submitted = false;
// loading status of forms to put loading.gif
  info_loading = false;
  psw_loading = false;
// error status that comes from http responses
  error_of_info = '';
  error_of_psw = '';
//success status of functions
  successOfPsw = false;
  successOfInfo = false;
//checkers for changing form tabs: password/userInfo
  isChanged = false;
  status = 'userInfo';


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public authenticationService: AuthenticationService,
    public userService: UserService,
  ) { }

  ngOnInit() {

    this.currentUser = this.authenticationService.currentUserValue;

    this.infoForm = this.formBuilder.group({
      name: [this.currentUser.name, [Validators.required]],
      surname: [this.currentUser.surname, [Validators.required]],
      gender: [this.currentUser.gender , Validators.required]
    });

    this.passwordForm = this.formBuilder.group({
      oldPsw: ['' , [Validators.pattern(this.passwordPattern),
        Validators.required]],
      newPsw: ['', [Validators.pattern(this.passwordPattern),
        Validators.required]],
      confirmPsw: ['', [Validators.pattern(this.passwordPattern),
        Validators.required]]
    });
  }

// changes form tab to password form and
// clear personal information form's fields
  changePasswordButton(){
    this.status = 'changePassword';
    this.info_loading = false;
    this.info_submitted = false;
    this.error_of_info = '';
  }


// changes form tab to personal information form and
// clear password form's fields
  userInfoButton() {
    this.status = 'userInfo';
    this.psw_loading = false;
    this.psw_submitted = false;
    this.error_of_psw = '';
  }

  //control functions to get form controls easily
  get formInfo() { return this.infoForm.controls; }
  get formPassword() { return this.passwordForm.controls}

// Detect if there is a change in form and enable submit button
  updateForm(){
    const nameArr = this.formInfo.name.value.trim().split(' ');
    let name = '';
    for (let i = 0 ; i < nameArr.length ; i++) {
      if ( i === 0 ) {
        name = name + nameArr[0];
      }
      else if ( nameArr[i] !== '' ) {
        name = name + ' ' + nameArr[i];
      }
    }

    this.isChanged = this.currentUser.name !== name
        || this.currentUser.surname !== this.formInfo.surname.value.trim()
        || this.currentUser.gender !== this.formInfo.gender.value;
  }

  // checker function to make password form submit button disable/enable
  pswSubmitDisableStatus(): boolean {
    return this.psw_loading || !this.formPassword.oldPsw.value
        || !this.formPassword.newPsw.value || !this.formPassword.confirmPsw.value
  }
// checker function to make user info form submit button disable/enable
  userInfoDisableStatus(): boolean {
    return this.info_loading || !this.isChanged || !this.formInfo.name.value.trim() || !this.formInfo.surname.value.trim()
  }

  onSubmitPassword(){
    this.psw_submitted = true;

    //Cancel submit process if form data is not appropriate
    if(this.passwordForm.invalid || (this.formPassword.newPsw.value !== this.formPassword.confirmPsw.value)){
      return;
    }

    const data = {
      userId: this.currentUser.userId,
      password: this.formPassword.newPsw.value,
      oldPassword: this.formPassword.oldPsw.value
    };

    this.psw_loading = true;
    this.userService.updatePassword(data)
        .subscribe(
            d => {
              this.successOfPsw = true;
              this.successFunction();
            },
            error => {
              this.error_of_psw = error;
              this.psw_loading = false;
              this.errorFunction();
            }
        );

  }

  onSubmitInfo() {
    this.info_submitted = true;

    //Cancel submit process if form data is not appropriate
    if (this.infoForm.invalid) {
      return;
    }

    const nameArr = this.formInfo.name.value.trim().split(' ');
    let name = '';
    for (let i = 0 ; i < nameArr.length ; i++) {
      if ( i === 0 ) {
        name = name + nameArr[0];
      }
      else if ( nameArr[i] !== '' ) {
        name = name + ' ' + nameArr[i];
      }
    }

    const data = {
      userId: this.currentUser.userId,
      name: name,
      surname: this.formInfo.surname.value.trim(),
      gender: this.formInfo.gender.value
    };

    this.info_loading = true;
    this.userService.updateInfo(data).pipe(first()).subscribe(
        d => {
          this.successOfInfo = true;
          this.authenticationService.updateCurrentUser(d);
          this.successFunction();
        },
        error => {
          this.error_of_info = error;
          this.info_loading = false;
          this.errorFunction();
        }
    );
  }

  successFunction() {
    setTimeout(() => {this.router.navigate([''])}, 1000);
  }

  errorFunction() {
    setTimeout(() => {location.reload()}, 1000);
  }


}
