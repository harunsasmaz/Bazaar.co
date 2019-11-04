import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

import { AuthenticationService } from './services/auth.service';
import { User } from './models/User';
import {filter, first} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from './login/login.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from './services/user.service';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit, OnDestroy{
  currentUser: User;
  subscription: Subscription;
  //forms
  loginForm: FormGroup;
  registerForm: FormGroup;
  //submit status of forms
  submittedLogin: boolean = false;
  submittedRegister: boolean = false;
  //loading status of forms
  loadingLogin: boolean = false;
  loadingRegister: boolean = false;
  //success status of forms
  successLogin: boolean = false;
  successRegister: boolean = false;
  // error status of forms
  errorLogin = '';
  errorRegister = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  ngOnInit(): void {

    this.subscription = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
    ).subscribe(() => window.scrollTo(0, 0));

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required, Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')]],
      password: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      gender: ['M' , Validators.required],
      email: ['', [Validators.email, Validators.required,
        Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')]],
      password: ['', [Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{6,}$'),
        Validators.required]],
      passwordCheck: ['' , Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authenticationService.logout();
    location.reload();
  }

  open(content) {
    this.modalService.open(content);
  }

  get form() { return this.registerForm.controls }

  submitDisableStatus():boolean {
    return this.loadingRegister          ||
        !this.form.name.value.trim()     ||
        !this.form.surname.value.trim()  ||
        !this.form.email.value           ||
        !this.form.password.value        ||
        !this.form.passwordCheck.value
  }

  onSubmitLogin() {
    this.submittedLogin = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loadingLogin = true;
    this.authenticationService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
        .pipe(first())
        .subscribe(
            data => {
              this.successLogin = true;
              this.successFunction();
            },
            error => {
              this.errorLogin = error;
              this.loadingLogin = false;
            });
  }

  onSubmitRegister() {

    this.submittedRegister = true;

    // stop here if form is invalid
    if (this.registerForm.invalid || (this.form.password.value !== this.form.passwordCheck.value)){
      return;
    }

    const nameArr = this.form.name.value.trim().split(' ');
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
      name: name,
      surname: this.form.surname.value.trim(),
      gender: this.form.gender.value,
      email: this.form.email.value.toLowerCase(),
      password: this.form.password.value
    };

    this.loadingRegister = true;
    this.userService.register(data)
        .pipe(first())
        .subscribe(
            d => {
              this.successRegister = true;
              this.successFunction();
            },
            error => {
              this.errorRegister = error;
              this.loadingRegister = false;
            });
  }

  successFunction() {
    setTimeout(() => { location.reload() }, 1000 );
  }

  errorFunction() {
    setTimeout(() => {location.reload()}, 1000 );
  }


}
