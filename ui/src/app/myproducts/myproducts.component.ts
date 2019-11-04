import { Component, OnInit } from '@angular/core';
import {Product} from '../models/Product';
import {UserService} from '../services/user.service';
import {AuthenticationService} from '../services/auth.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.css']
})
export class MyproductsComponent implements OnInit {

  products: Product[];
  error = '';
  constructor(private userService: UserService,
              private authService: AuthenticationService) { }

  ngOnInit() {
    this.userService.getProducts(this.authService.currentUserValue.userId).pipe(first())
        .subscribe( response => {
          this.products = response.data;
        },
            error => {
                this.error = error;
            });
  }
}
