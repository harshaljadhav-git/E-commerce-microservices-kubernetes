import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { HomeComponent } from './home/home.component'; // Import HomeComponent

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Set HomeComponent as the default route
  { path: 'login', component: LoginComponent },
  { path: 'product', component: ProductComponent }, // Corrected path
  { path: 'orders', component: OrderComponent },
];
