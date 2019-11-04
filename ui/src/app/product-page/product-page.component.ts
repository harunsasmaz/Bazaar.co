import { Component, OnInit } from '@angular/core';
import {Product} from '../models/Product';
import {ProductService} from '../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {User} from '../models/User';
import {UserService} from '../services/user.service';
import {CommentService} from '../services/comment.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {AuthenticationService} from '../services/auth.service';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  currentProduct:Product;
  productOwner: User;
  pageId:string;
  routeSub:Subscription;
  averageRate: number = 0;
  addForm: FormGroup;
  submitted = false;
  loading = false;
  success = false;
  error = '';

  constructor(
      private productService:ProductService,
      private route:ActivatedRoute,
      private userService:UserService,
      public commentService:CommentService,
      private authService: AuthenticationService,
      private formBuilder:FormBuilder,
      private modalService:NgbModal,
      private config: NgbModalConfig)
  {
      config.backdrop = 'static';
      config.keyboard = false;
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
        this.pageId = params['productId'] //log the value of id
    });
    this.productService.getById(this.pageId).subscribe( response => {
        this.currentProduct = response.data;

        this.currentProduct.comments.forEach( c => this.averageRate = this.averageRate + c.rating);

        if(this.currentProduct.comments.length > 0){
            this.averageRate = this.averageRate/this.currentProduct.comments.length;
        }

        this.userService.getById(this.currentProduct.userId).subscribe(response => {
            this.productOwner = response.data;
        });
    });

      this.addForm = this.formBuilder.group({
          title: ['', Validators.required],
          text: ['', Validators.required],
          rate: [0, Validators.required]
      });



  }

    open(content) {
        this.modalService.open(content);
    }

    onSubmit() {
      this.submitted = true;

      if(this.addForm.invalid){
          return;
      }

      const data = {
          productId:this.currentProduct.productId,
          userId: this.authService.currentUserValue.userId,
          title: this.addForm.controls.title.value,
          text: this.addForm.controls.text.value,
          rating: this.addForm.controls.rate.value,
      };

      this.loading = true;
      this.commentService.addComment(data).subscribe(
          data => {
              this.error = '';
              this.success = true;
              this.successFunction();
          },
          error => {
              this.error = error;
              this.loading = false;
          }
      )
    }

    successFunction(){
      setTimeout(() => {
          location.reload();
      }, 1000)
    }

}
