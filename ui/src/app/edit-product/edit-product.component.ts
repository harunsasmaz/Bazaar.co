import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../models/User";
import {Category} from "../models/Category";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {AuthenticationService} from "../services/auth.service";
import {ProductService} from "../services/product.service";
import {CategoryService} from "../services/category.service";
import {config} from "../_config/config";
import {first} from "rxjs/operators";
import {Product} from "../models/Product";
import {Subscription} from "rxjs";
import {Ng2ImgMaxService} from "ng2-img-max";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  // form related
  categories: Category[];
  value: string[];
  name: string[];
  product: Product;
  productForm: FormGroup;
  isChanged: boolean;
  // general
  currentUser: User;
  error = '';
  loading = false;
  submitted = false;
  productId: string;
  success = '';
  // image related
  imageChanged = false;
  photoLoading = false;
  imageSizeError = '';
  image: string;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private userService: UserService,
      private authenticationService: AuthenticationService,
      private productService: ProductService,
      private route: ActivatedRoute,
      private categoryService: CategoryService,
      private comp: Ng2ImgMaxService,
      private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;

    this.name = ['' ,'' ,'' ,'' ,''];
    this.value = ['' ,'' ,'' ,'' ,''];
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      category: ['', Validators.required],
      description: ['', [Validators.required]],
      stock: [Validators.required]
    });

    this.getProductInfo();
    this.getCategories();
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
            },
            error => {
              this.error = error;
              this.router.navigate(['/']);
            });
  }

  getProductInfo(){
    this.route.params.subscribe(params => {
      this.productId = params['productId']; //log the value of id
      this.productService.getById(this.productId)
          .pipe(first())
          .subscribe(
              (d) => {
                if(d.data.userId !== this.currentUser.userId)
                  this.router.navigate(['/']);
                this.product = d.data;
                this.productForm.controls.name.setValue(this.product.name);
                this.productForm.controls.description.setValue(this.product.description);
                this.productForm.controls.price.setValue(this.product.price);
                this.productForm.controls.category.setValue(this.product.categoryId);
                this.productForm.controls.stock.setValue(this.product.stock);
                this.image = this.product.image;
              },
              error => {
                this.error = error;
                this.navigateHomeTimeOut();
              });
    });
  }

  readThis(inputValue: any): void {
    let myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.image = <string>myReader.result;
    };
    myReader.readAsDataURL(inputValue);
    this.imageChanged = true;
    this.photoLoading = false;
    this.imageSizeError = '';

  }

  onImageChange(event) {
    let image: File = event.target.files[0];
    if(!image) return;
    if(image.size > 20000000){
      this.imageSizeError = 'Exceed limit of 20MB';
      return;
    }
    this.photoLoading = true;
    this.comp.resizeImage(image, 300, 10000).subscribe(
        result => {
          let options: FilePropertyBag = {
            lastModified: image.lastModified,
            type: image.type
          };
          let uploaded = new File([result],result.name, options);
          this.readThis(uploaded);
        },
        error => {
          this.photoLoading = false;
          this.error = error;
          this.reloadTimeOut();
        }
    );
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

  submitDisableStatus():boolean {
    return this.loading           ||
        !this.form.name.value.trim()     ||
        !this.form.description.value.trim()  ||
        !this.form.price.value ||
        (this.form.price.value < 1) ;
  }

  updateForm() {
    const nameArr = this.form.name.value.trim().split(' ');
    let name = '';
    for (let i = 0; i < nameArr.length; i++) {
      if (i === 0) {
        name = name + nameArr[0];
      } else if (nameArr[i] !== '') {
        name = name + ' ' + nameArr[i];
      }
    }

    this.isChanged = name !== this.product.name ||
        this.form.description.value.trim() !== this.product.description ||
        this.form.price.value !== this.product.price || this.form.stock.value !== this.product.stock
  || this.form.category.value !== this.product.categoryId;
  }

  get form() { return this.productForm.controls; }


  deleteProduct(){
    this.loading = true;
    this.productService.deleteProduct(this.currentUser.userId, this.productId)
        .pipe(first())
        .subscribe(
            (d: any) => {
              this.success = 'Successfully deleted';
              this.navigateHomeTimeOut();
            },
            error => {
              this.error = error;
              this.loading = false;
              this.reloadTimeOut();
            });
  }

  open(content) {
    this.modalService.open(content);
  }

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

    let image,imageType;
    if(this.imageChanged){
      imageType = this.image.split(':')[1].split(';')[0];
      image = this.image.split(',')[1];
    }

    const data = {
      name: name.toLowerCase(),
      description: this.form.description.value.trim(),
      price: this.form.price.value,
      categoryId: this.form.category.value,
      userId: this.currentUser.userId,
      image: image,
      imageType: imageType,
      productId: this.product.productId,
      stock: this.form.stock.value
    };


    this.loading = true;
    let imageCase = this.imageChanged ? '1' : '0';
    this.productService.editProduct(data,imageCase)
        .pipe(first())
        .subscribe(
            d => {
              this.imageSizeError = '';
              this.success = 'Successfully saved';
              this.reloadTimeOut();
            },
            error => {
              this.error = 'Image size is too high';
              this.loading = false;
            });
  }

}
