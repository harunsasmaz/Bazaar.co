import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../services/category.service';
import {first} from 'rxjs/operators';
import {Product} from '../models/Product';
import {FormControl, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/auth.service';
import {User} from '../models/User';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    private _opened: boolean = false;
    private loading = false;
    selectedCategoryId: string = '';
    private categoryNames = ['', '', '', '', ''];
    private categoryIds = ['', '', '', '', ''];
    private categoryDescriptions = ['', '', '', '', ''];
    private order = 'descending';
    private sortField = 'price';
    skip = 0;
    private limit = 6;
    products: Product[] = [];
    error = '';
    private currentPageNumber: number = 1;
    private totalPageNumber: number;
    private pages = [];

    minPrice: number = 0;
    maxPrice: number = Infinity;
    minControl: FormControl;
    maxControl: FormControl;
    didSubmit: boolean = false;
    currentUser: User;

    constructor(
        private categoryService: CategoryService,
        private authService: AuthenticationService
    ) {
    }


    ngOnInit() {

        this.currentUser = this.authService.currentUserValue;

        this.maxControl = new FormControl(null, [Validators.required, Validators.min(0)]);
        this.minControl = new FormControl(null, [Validators.required, Validators.min(0)]);

        this.categoryService.getCategories()
            .pipe(first())
            .subscribe(
                res => {
                    for (let i = 0; i < 5; i++) {
                        this.categoryNames[i] = res.data[i].name;
                        this.categoryIds[i] = res.data[i].categoryId;
                        this.categoryDescriptions[i] = res.data[i].description;
                    }
                    this.selectedCategoryId = this.categoryIds[0];
                    this.getProducts(this.selectedCategoryId);
                },
                error => {
                    this.error = error;
                }
            );
    }

    private getProducts(categoryId: string) {
        this.categoryService.getCategoryById(categoryId, this.sortField, this.order, this.skip.toString(), this.limit.toString(), this.minPrice, this.maxPrice)
            .pipe(first())
            .subscribe(
                res => {
                    this.products = res.data.products;
                    if (this.skip === 0) {
                        this.pages = [];
                        this.totalPageNumber = Math.ceil(res.data.count / 6);
                        if (this.totalPageNumber === 0) {
                            this.pages.push(1);
                        } else {
                            for (let i = 0; i < this.totalPageNumber; i++) {
                                this.pages.push(i + 1);
                            }
                        }
                        this.currentPageNumber = 1;
                    }

                },
                error => {
                    this.error = error;
                }
            );
    }


    private toggle(event: boolean): void {
        this._opened = event;
    }

    onClick(event) {
        let value = event.srcElement.value;
        if (this.selectedCategoryId !== value) {
            this.skip = 0;
            this.selectedCategoryId = value;
            this.getProducts(this.selectedCategoryId);
        }
        this.toggle(false);
    }

    sort() {
        if (this.minControl.invalid) {
            this.minPrice = 0;
        }

        if(this.maxControl.invalid){
            this.maxPrice = Infinity;
        }

        this.getProducts(this.selectedCategoryId);
    }

    onChangePage(e) {
        this.currentPageNumber = e.srcElement.innerText;
        this.skip = this.currentPageNumber * this.limit - this.limit;
        this.getProducts(this.selectedCategoryId);
    }

    onFilter() {
        if(this.minControl.invalid && this.maxControl.invalid){
            return;
        } else if(this.minControl.invalid){
            this.minPrice = 0;
            this.maxPrice = this.maxControl.value;
        } else if(this.maxControl.invalid){
            this.maxPrice = Infinity;
            this.minPrice = this.minControl.value;
        } else {
            if(this.minControl.value > this.maxControl.value){
                this.error = 'Min value cannot be higher than max value';
                return;
            }
            this.minPrice = this.minControl.value;
            this.maxPrice = this.maxControl.value;
        }
        this.skip = 0;
        this.currentPageNumber = 1;
        this.getProducts(this.selectedCategoryId);
    }
}

