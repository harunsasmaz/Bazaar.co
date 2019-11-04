import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../models/Product';
import {CommentService} from '../services/comment.service';
import {UserService} from '../services/user.service';
import {User} from '../models/User';
import {AuthenticationService} from '../services/auth.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() currentProduct: Product;
  owner: User;
  error = '';
  rating:number = 0;

  constructor(public commentService: CommentService,
              private userService: UserService,
              private authService: AuthenticationService) { }

  ngOnInit() {

      this.userService.getById(this.currentProduct.userId).subscribe( response => {
          this.owner = response.data;
              this.commentService.getAverageRate(this.currentProduct.productId).subscribe( response => {
                      this.rating = response.data;
                  },
                  error => {
                      this.error = error;
                  });
      },
              error => {
                    this.error = error;
      });
  }

  capitalize(name: string){
      return name.charAt(0).toUpperCase() + name.substring(1);
  }
}
