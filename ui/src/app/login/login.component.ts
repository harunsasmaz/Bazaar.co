import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import { AuthenticationService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  success = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    public authenticationService: AuthenticationService
  ) { }


  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required, Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')]],
      password: ['', Validators.required]
    });


    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  // convenience getter for easy access to form fields
  get form() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.form.email.value, this.form.password.value)
        .pipe(first())
        .subscribe(
            data => {
              this.success = true;
              this.successFunction();
            },
            error => {
              this.error = error;
              this.loading = false;
            });
  }

  successFunction() {
    setTimeout(() => { this.router.navigate([this.returnUrl]); }, 1000 );
  }

  errorFunction() {
    setTimeout(() => {location.reload()}, 1000 );
  }
}
