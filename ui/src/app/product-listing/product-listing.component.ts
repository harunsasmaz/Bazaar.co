import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../models/Product';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css'],
})
export class ProductListingComponent implements OnInit {
  @Input() products: Product[] = [];
  constructor() { }
  ngOnInit() {
  }
}
