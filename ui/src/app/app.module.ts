import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { routing } from './app.routing';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CommonModule} from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommentComponent } from './comment/comment.component';
import { AddProductComponent } from './add-product/add-product.component';
import { Ng2ImgMaxModule} from "ng2-img-max";
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductCardComponent} from './product-card/product-card.component';
import { SortByPipe } from './helpers/sortByPipe';
import { ProductListingComponent } from './product-listing/product-listing.component';
import {SidebarModule} from "ng-sidebar";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {JwPaginationComponent} from "jw-angular-pagination";
import { MyproductsComponent } from './myproducts/myproducts.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    JwPaginationComponent,
    AddProductComponent,
    ProductPageComponent,
    ProductCardComponent,
    CommentComponent,
    EditProductComponent,
    SortByPipe,
    ProductListingComponent,
    MyproductsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    InfiniteScrollModule,
    SidebarModule.forRoot(),
    routing,
    Ng2ImgMaxModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide : SortByPipe}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
