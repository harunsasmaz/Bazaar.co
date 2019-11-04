import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProductComponent } from './edit-product.component';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Observable, throwError} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../services/product.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CategoryService} from "../services/category.service";
import {Ng2ImgMaxService} from "ng2-img-max";
import {AuthenticationService} from "../services/auth.service";

class MockBuilder {
  private form = new FormBuilder();
  group(config) {
    return this.form.group(config);
  }
}

class MockGroup {
  controls: {
    name: {value: ''},
    price: {value: ''},
    description: {value: ''}
  };
  invalidCheck = () => { return this.controls.name.value === ''
      || this.controls.price.value === ''
      || this.controls.description.value === ''};
  invalid = this.invalidCheck();
}

class MockProductService {
  editProduct(data){
    return new Observable(observer => observer.next(2));
  }

  getById(productId: string){
    return new Observable(observer => observer.next({data: {productId: 'test', name:'test', price:10,
        description:'test', image:'image', imageType: 'png', userId:'test', categoryId: 'test', comments: []}}))
  }

  deleteProduct(data){
    return new Observable(observer => observer.next(2));
  }
}

class MockCategoryService{
  categories = [
    {name:'c1',categoryId:'0'},
    {name:'c2',categoryId:'1'},
    {name:'c3',categoryId:'2'},
    {name:'c4',categoryId:'3'},
    {name:'c5',categoryId:'4'}
  ];
  getCategories(data){
    return new Observable(observer => observer.next({data: this.categories}));
  }
}

class MockRouter {
  navigate(path: string){}
}

class MockImgService{
  resizeImage(img, width, height){ return new Observable(observer => {observer.next(1)})}
}

class MockRoute{
  params = new Observable(observer => observer.next({params: ['productId']}))
}

class MockAuth{
  get currentUserValue(){
    return {userId: 'test'};
  }
}

describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProductComponent ],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [
        {provide: Router, useClass: MockRouter},
        {provide: FormBuilder, useClass: MockBuilder},
        {provide: FormGroup, useClass: MockGroup},
        {provide: ProductService, useClass: MockProductService},
        {provide: CategoryService, useClass: MockCategoryService},
        {provide: ProductService, useClass: MockProductService},
        {provide: Ng2ImgMaxService, useClass: MockImgService},
        {provide: ActivatedRoute, useClass: MockRoute},
        {provide: AuthenticationService, useClass: MockAuth}
      ]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, 'reloadTimeOut').and.callFake(() => {});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form', () => {
    expect(component.productForm).not.toBe(undefined);
  });

  it('should set loading true if delete button is clicked', () => {
    component.deleteProduct();
    expect(component.loading).toBe(true);
  });

  it('should not submit if some fields dont exist', () => {
    component.productForm.controls.name.setValue('test');
    component.productForm.controls.price.setValue(3);
    component.productForm.controls.description.setValue('');
    component.onSubmit();
    expect(component.loading).toEqual(false);
  });

  it('should submit if everything is ok', () => {
    component.productForm.controls.name.setValue('test  test');
    component.productForm.controls.price.setValue(3);
    component.productForm.controls.description.setValue('test  test');
    component.image = 'data:image/png;base64,base64format';
    component.currentUser = {
      email: "", gender: "", password: "", surname: "", token: "", userId: '0', name:""};
    component.onSubmit();
    expect(component.error).toEqual('');
  });

});
