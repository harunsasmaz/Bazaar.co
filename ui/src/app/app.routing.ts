import {Routes, RouterModule } from '@angular/router';
import {LoginComponent } from './login/login.component';
import {AuthGuard } from './guards/auth.guard';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {ProductPageComponent} from './product-page/product-page.component';
import {CommentComponent} from './comment/comment.component';
import {AddProductComponent} from "./add-product/add-product.component";
import {EditProductComponent} from "./edit-product/edit-product.component";
import {ProductCardComponent} from './product-card/product-card.component';
import {ProductListingComponent} from './product-listing/product-listing.component';
import {MyproductsComponent} from './myproducts/myproducts.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'product/:productId',
    component: ProductPageComponent
  },
  {
    path: 'user/addProduct',
    component: AddProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'product/edit/:productId',
    component: EditProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/products',
    component: MyproductsComponent,
    canActivate: [AuthGuard]
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
