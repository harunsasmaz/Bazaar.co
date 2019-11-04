import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router} from '@angular/router';
import { UserService } from '../services/user.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;
  loading = false;
  disabled = false;
  success = false;
  error = '';

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private userService: UserService,
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
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
// checker function to make register form submit button disable/enable
  submitDisableStatus():boolean {
    return this.loading                  ||
        !this.form.name.value.trim()     ||
        !this.form.surname.value.trim()  ||
        !this.form.email.value           ||
        !this.form.password.value        ||
        !this.form.passwordCheck.value
  }


  get form() { return this.userForm.controls; }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid || (this.form.password.value !== this.form.passwordCheck.value)){
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

    this.loading = true;
    this.userService.register(data)
        .pipe(first())
        .subscribe(
            d => {
              this.success = true;
              this.successFunction();
            },
            error => {
              this.error = error;
              this.loading = false;
            });
  }

  successFunction() {
    setTimeout(() => {this.router.navigate(['/login'])}, 1000 );
  }

  errorFunction() {
    setTimeout(() => {location.reload()}, 1000 );
  }
}
