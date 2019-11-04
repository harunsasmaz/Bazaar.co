import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../models/User';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {AuthenticationService} from '../services/auth.service';
import {first} from 'rxjs/operators';
import {ProductService} from "../services/product.service";
import {CategoryService} from "../services/category.service";
import {Category} from "../models/Category";
import {config} from '../_config/config';
import {Ng2ImgMaxService} from "ng2-img-max";

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit  {

    // general
    currentUser: User;
    error = '';
    loading = false;
    submitted = false;
    success = '';
    // form related
    categories: Category[];
    value: string[];
    name: string[];
    productForm: FormGroup;
    //image related
    image: string;
    imageSizeError = '';
    photoLoading = false;
    isPhotoAdded = false;


    constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private userService: UserService,
      private authenticationService: AuthenticationService,
      private productService: ProductService,
      private categoryService: CategoryService,
      private comp: Ng2ImgMaxService
  ) {}
  ngOnInit(): void {
    // initialization
    this.image = config.ADD_PRODUCT_IMAGE;
    this.currentUser = this.authenticationService.currentUserValue;

    // form initialization
    this.name = ['' ,'' ,'' ,'' ,''];
    this.value = ['' ,'' ,'' ,'' ,''];
    this.productForm = this.formBuilder.group({
        name: ['', Validators.required],
        price: ['', Validators.required],
        category: [this.value[0] , Validators.required],
        description: ['', [Validators.required]]
    });

    this.getCategories(); // setting true category names
  }

  getCategories(){
      this.categoryService.getCategories()
          .pipe(first())
          .subscribe(
              (d) => {
                  this.categories = d.data;
                  for(let i = 0 ; i < this.categories.length ; i++){
                      this.name[i] = this.categories[i].name;
                      this.value[i] = this.categories[i].categoryId;
                  }
                  this.productForm.controls.category.setValue(this.value[0]);
              },
              error => {
                  this.error = error;
                  this.reloadTimeOut();
              });
  }

    reloadTimeOut(){
        setTimeout(() => {
            location.reload();
        }, 1000)
    }

    navigateHomeTimeOut(){
        setTimeout(() => {
            this.router.navigate(['/'])
        }, 1000)
    }

  readThis(inputValue: any): void {
    let myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.image = <string>myReader.result;
    };
    myReader.readAsDataURL(inputValue);
    this.isPhotoAdded = true;
    this.photoLoading = false;
    this.imageSizeError = '';
  }

  onImageChange(event) {
    let image: File = event.target.files[0];
    if(image.size > 20000000){
        this.imageSizeError = 'Exceed limit of 20MB';
        return;
    }
    this.photoLoading = true;
    this.comp.resizeImage(image, 400, 400).subscribe(
        result => {
          let options: FilePropertyBag = {
            lastModified: image.lastModified,
            type: image.type
          };
          let uploaded = new File([result],result.name, options);
          this.readThis(uploaded);
        },
        error => {
          this.error = error;
          this.photoLoading = false;
          this.reloadTimeOut();
        }
    );
  }



  submitDisableStatus(): boolean {
    return this.loading           ||
        !this.form.name.value.trim()     ||
        !this.form.description.value.trim()  ||
        !this.form.price.value ||
        (this.form.price.value < 1) ;
  }

  get form() { return this.productForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.productForm.invalid){
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


    let imageType: string;
    let image: string;
    if(this.isPhotoAdded){
        imageType = this.image.split(':')[1].split(';')[0];
        image = this.image.split(',')[1];
    }
    else{
        imageType = config.DEFAULT_PRODUCT_IMAGE_TYPE;
        image = config.DEFAULT_PRODUCT_IMAGE_BASE64;
    }

    const data = {
        name: name,
        description: this.form.description.value.trim(),
        price: this.form.price.value,
        categoryId: this.form.category.value,
        userId: this.currentUser.userId,
        image: image,
        imageType: imageType,
        stock: true
    };


    this.loading = true;
    this.productService.addProduct(data)
        .pipe(first())
        .subscribe(
            d => {
              this.imageSizeError = '';
              this.error = '';
              this.success = 'Successfully saved';
              this.navigateHomeTimeOut();
            },
            error => {
              this.error = 'Image size is too high';
              this.loading = false;
            });
  }
}
