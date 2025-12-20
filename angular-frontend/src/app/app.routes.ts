import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'products',
        loadComponent: () => import('./features/products/product-list.component').then(m => m.ProductListComponent)
      },
      {
        path: 'orders',
        loadComponent: () => import('./features/orders/order-list.component').then(m => m.OrderListComponent)
      },
      {
        path: 'inventory',
        loadComponent: () => import('./features/inventory/inventory-list.component').then(m => m.InventoryListComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./features/users/user-list.component').then(m => m.UserListComponent)
      },
      {
        path: 'payments',
        loadComponent: () => import('./features/payments/payment-list.component').then(m => m.PaymentListComponent)
      },
      {
        path: 'shipping',
        loadComponent: () => import('./features/shipping/shipping-list.component').then(m => m.ShippingListComponent)
      },
      {
        path: 'notifications',
        loadComponent: () => import('./features/notifications/notification-list.component').then(m => m.NotificationListComponent)
      },
      {
        path: 'favourites',
        loadComponent: () => import('./features/favourites/favourite-list.component').then(m => m.FavouriteListComponent)
      },
      {
        path: 'ratings',
        loadComponent: () => import('./features/ratings/rating-list.component').then(m => m.RatingListComponent)
      },
      {
        path: 'tax',
        loadComponent: () => import('./features/tax/tax-list.component').then(m => m.TaxListComponent)
      },
      {
        path: 'search',
        loadComponent: () => import('./features/search/search.component').then(m => m.SearchComponent)
      },
      {
        path: 'promotions',
        loadComponent: () => import('./features/promotions/promotion-list.component').then(m => m.PromotionListComponent)
      },
      {
        path: 'health',
        loadComponent: () => import('./features/health/service-health.component').then(m => m.ServiceHealthComponent)
      },
      {
        path: 'api-test',
        loadComponent: () => import('./features/api-test/api-tester.component').then(m => m.ApiTesterComponent)
      }
    ]
  },
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  }
];
