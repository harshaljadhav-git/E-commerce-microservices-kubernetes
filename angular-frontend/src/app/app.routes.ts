import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductComponent },
  { path: 'orders', component: OrderComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
