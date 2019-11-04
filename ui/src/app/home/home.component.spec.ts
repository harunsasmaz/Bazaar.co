import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import {User} from "../models/User";
import {FormBuilder, FormControl, ReactiveFormsModule} from "@angular/forms";
import {Observable} from "rxjs";
import {NgbModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../services/auth.service";
import {CategoryService} from "../services/category.service";
import {SidebarModule} from "ng-sidebar";
import {ProductListingComponent} from "../product-listing/product-listing.component";
import {ProductCardComponent} from "../product-card/product-card.component";
import {RouterTestingModule} from "@angular/router/testing";
import {CommonModule} from "@angular/common";
import {HttpClientTestingModule} from "@angular/common/http/testing";

class MockCategoryService{
  categories = [
    {name:'c1',categoryId:'0', description:'d'},
    {name:'c2',categoryId:'1', description: 'd'},
    {name:'c3',categoryId:'2', description: 'd'},
    {name:'c4',categoryId:'3', description: 'd'},
    {name:'c5',categoryId:'4', description: 'd'}
  ];
  category = {
    name:'c1',categoryId:'0', description:'d', products: [
      {
        productId: 'test', name:'test', price:10, description:'test', image:'image', imageType: 'png', userId:'test', categoryId: 'test', comments: [], stock: true
      },
      {
        productId: 'test', name:'test', price:10, description:'test', image:'image', imageType: 'png', userId:'test', categoryId: 'test', comments: [], stock: true
      }
    ]
  };


  getCategories(data){
    return new Observable(observer => observer.next({data: this.categories}));
  }

  getCategoryById(categoryId: string){
    return new Observable(observer => observer.next({data: this.category}));
  }
}


class MockAuthService{
  get currentUserValue():User {
    return {name:'test', surname:'test', gender:'U', email:'test@test.com', password:'test', userId:'test', token:'token'};
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, ProductListingComponent, ProductCardComponent ],
      imports: [CommonModule, ReactiveFormsModule, NgbModule, NgbTooltipModule, SidebarModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
        {provide: CategoryService, useClass: MockCategoryService},
        {provide: AuthenticationService, useClass: MockAuthService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have products', () => {
    expect(component.products).not.toBe(undefined);
  });

  it('should have a selected category', () => {
    expect(component.selectedCategoryId).not.toBe('');
  });

  it('should have current user', () => {
    expect(component.currentUser).not.toBe(undefined);
  });

  it('should change category successfully', () => {
    let value = '1';
    component.onClick({srcElement: {value: value}});
    expect(component.selectedCategoryId).toEqual(value);
  });

  it('should have correct skip value when page is changed', () => {
    let page = '2';
    component.onChangePage({srcElement:{innerText: page}});
    expect(component.skip).toEqual(6);
  });

  it('should have error if min control is higher than max control', () => {
    component.maxControl.setValue(10);
    component.minControl.setValue(15);
    component.onFilter();
    expect(component.error).toEqual('Min value cannot be higher than max value');
  });

  it('should make skip 0 if max control is higher than min control', () => {
    component.skip = 1;
    component.maxControl.setValue(20);
    component.minControl.setValue(15);
    component.onFilter();
    expect(component.skip).toEqual(0);
  });


});
