import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPageComponent } from './product-page.component';
import {ProductService} from '../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentService} from '../services/comment.service';
import {UserService} from '../services/user.service';
import {AuthenticationService} from '../services/auth.service';
import {NgbModal, NgbModalConfig, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {User} from '../models/User';
import {Observable, throwError} from 'rxjs';
import {CommentComponent} from '../comment/comment.component';
import {RouterTestingModule} from '@angular/router/testing';

class MockBuilder {
  private form = new FormBuilder();
  group(config) {
    return this.form.group(config);
  }
}

class MockAuth {
  get currentUserValue():User {
    return {name:'test', surname:'test', gender:'U', email:'test@test.com', password:'test', userId:'test', token:'token'};
  }
}

class MockUser {
  getById(id){
    return new Observable(observer =>
        observer.next({data: {name:'test', surname:'test', gender:'U',
          email:'test@test.com', password:'test', userId:'test', token:'token'}}))
  }
}

class MockRouter {
  navigate(path) {}
}

class MockModal {
  open(content) {}
}

class MockComment {
    addComment(data) {
    if(data.productId === ''){
      return throwError('Could not add comment');
    }
    return new Observable(observer => observer.next(1));
  }
}

class MockProduct {
  getById(id){
    return new Observable(observer => observer.next({data: {productId: 'test', name:'test', price:10,
      description:'test', image:'image', imageType: 'png', userId:'test', categoryId: 'test', comments: []}}))
  }
}

let config = {
  backdrop: '',
  keyboard: false
};

class MockRoute {
  params = new Observable(observer => observer.next({params: ['productId']}))

}



describe('ProductPageComponent', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPageComponent, CommentComponent ],
      imports: [ReactiveFormsModule, NgbModule, RouterTestingModule],
      providers: [
        {provide: ProductService, useClass: MockProduct},
        {provide: Router, useClass: MockRouter},
        {provide: ActivatedRoute, useClass: MockRoute},
        {provide: CommentService, useClass: MockComment},
        {provide: UserService, useClass: MockUser},
        {provide: AuthenticationService, useClass: MockAuth},
        {provide: NgbModal, useClass: MockModal},
        {provide: NgbModalConfig, useValue: config},
        {provide: FormBuilder, useClass: MockBuilder}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, 'successFunction').and.callFake(() => {});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have product owner field which is not undefined', function() {
    expect(component.productOwner).not.toBe(undefined);
  });

  it('should have current product field which is not undefined', function() {
    expect(component.currentProduct).not.toBe(undefined);
  });

  it('average rate should be zero if no comments found', function() {
    expect(component.averageRate).toEqual(0);
  });

  it('should have a addForm field', function() {
    expect(component.addForm).not.toBe(undefined);
  });

  it('should set submitted to true when onSubmit() called', function() {
    component.onSubmit();
    expect(component.submitted).toEqual(true);
  });

  it('onSubmit() should return when form is invalid', function() {
    component.onSubmit();
    expect(component.loading).toEqual(false);
  });

  it('should set success to true when addProduct function returns a data', function() {
    component.addForm.controls.title.setValue('test');
    component.addForm.controls.text.setValue('test');
    component.addForm.controls.rate.setValue(1);
    component.onSubmit();
    expect(component.success).toEqual(true)
  });

  it('should have error message when an error is occurred', function() {
    component.currentProduct.productId = '';
    component.addForm.controls.title.setValue('test');
    component.addForm.controls.text.setValue('test');
    component.addForm.controls.rate.setValue(1);
    component.onSubmit();
    expect(component.error).not.toEqual('');
  });

  it('should set loading to false when an error is occurred', function() {
    component.currentProduct.productId = '';
    component.addForm.controls.title.setValue('test');
    component.addForm.controls.text.setValue('test');
    component.addForm.controls.rate.setValue(1);
    component.onSubmit();
    expect(component.loading).toEqual(false);
  });

  it('should call addComment function when form is valid', function() {
    spyOn(component.commentService,'addComment').and.callThrough();
    component.addForm.controls.title.setValue('test');
    component.addForm.controls.text.setValue('test');
    component.addForm.controls.rate.setValue(1);
    component.onSubmit();
    expect(component.commentService.addComment).toHaveBeenCalled();
  });

});
