import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';
import {CommentService} from '../services/comment.service';
import {UserService} from '../services/user.service';
import {AuthenticationService} from '../services/auth.service';
import {Observable, throwError} from 'rxjs';
import {NgbModule, NgbRatingModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';

class MockUser {
  getById(userId: string) {
    if(userId === '' || userId !== 'test'){
      return throwError('error');
    }
    return new Observable(observer => observer.next({data: 'test'}));
  }
}

class MockComment {
  getAverageRate(productId: string) {
    if(productId === '' || productId !== 'test'){
      return  throwError('error');
    }
    return new Observable(observer => observer.next({data: 3}));
  }
}

class MockAuth {
  get currentUserValue() {
    return {userId: 'test'}
  }
}


describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCardComponent ],
      imports: [CommonModule, NgbModule, RouterTestingModule, NgbTooltipModule, NgbRatingModule],
      providers: [
        {provide: CommentService, useClass: MockComment},
        {provide: UserService, useClass: MockUser},
        {provide: AuthenticationService, useClass: MockAuth}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.currentProduct = {
      productId: 'test',
      userId: 'test',
      categoryId: 'test',
      name: 'test',
      price: 1,
      description: 'test',
      image: 'test',
      imageType: 'test',
      comments: [],
      stock: true
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a product owner as instance of User class', function() {
    expect(component.owner).not.toEqual(undefined);
  });

  it('should get rating value of product from backend', function() {
    expect(component.rating).not.toEqual(0);
  });

  it('should capitalize strings', function() {
   expect(component.capitalize('harun')).toEqual('Harun')
  });


});
