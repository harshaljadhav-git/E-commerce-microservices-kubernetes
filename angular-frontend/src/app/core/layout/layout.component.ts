import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen bg-gray-50 flex font-sans text-slate-800">
      
      <!-- Sidebar -->
      <aside class="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-30 transition-all duration-300">
        <!-- Logo -->
        <div class="h-[72px] px-6 flex items-center gap-3 border-b border-gray-50">
          <div class="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center shadow-md shadow-primary/20">
            <span class="font-bold text-lg">K</span>
          </div>
          <h1 class="text-xl font-bold tracking-tight text-gray-900">
            Kylink
          </h1>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-3 space-y-1 overflow-y-auto py-6">
          <a routerLink="/dashboard" routerLinkActive="bg-blue-50 text-primary" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all group">
            <i class="fas fa-home w-5 text-center group-hover:text-primary transition-colors"></i>
            <span class="font-medium text-sm">Dashboard</span>
          </a>
          
          <div class="pt-6 pb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Inventory</div>
          
          <a routerLink="/products" routerLinkActive="bg-blue-50 text-primary" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all group">
            <i class="fas fa-box w-5 text-center group-hover:text-primary transition-colors"></i>
            <span class="font-medium text-sm">Global Products</span>
          </a>
          
          <a routerLink="/inventory" routerLinkActive="bg-blue-50 text-primary" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all group">
            <i class="fas fa-boxes w-5 text-center group-hover:text-primary transition-colors"></i>
            <span class="font-medium text-sm">Stock Levels</span>
          </a>
          
          <div class="pt-6 pb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Commerce</div>

          <a routerLink="/orders" routerLinkActive="bg-blue-50 text-primary" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all group">
            <i class="fas fa-shopping-cart w-5 text-center group-hover:text-primary transition-colors"></i>
            <span class="font-medium text-sm">Orders</span>
          </a>

          <a routerLink="/users" routerLinkActive="bg-blue-50 text-primary" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all group">
            <i class="fas fa-users w-5 text-center group-hover:text-primary transition-colors"></i>
            <span class="font-medium text-sm">Customers</span>
          </a>

          <a routerLink="/payments" routerLinkActive="bg-blue-50 text-primary" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all group">
            <i class="fas fa-credit-card w-5 text-center group-hover:text-primary transition-colors"></i>
            <span class="font-medium text-sm">Payments</span>
          </a>

          <a routerLink="/shipping" routerLinkActive="bg-blue-50 text-primary" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all group">
            <i class="fas fa-truck w-5 text-center group-hover:text-primary transition-colors"></i>
            <span class="font-medium text-sm">Shipping</span>
          </a>

          <div class="pt-6 pb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Marketing</div>

          <a routerLink="/promotions" routerLinkActive="bg-blue-50 text-primary" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all group">
            <i class="fas fa-tags w-5 text-center group-hover:text-primary transition-colors"></i>
            <span class="font-medium text-sm">Promotions</span>
          </a>
          
          <a routerLink="/ratings" routerLinkActive="bg-blue-50 text-primary" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all group">
            <i class="fas fa-star w-5 text-center group-hover:text-primary transition-colors"></i>
            <span class="font-medium text-sm">Reviews</span>
          </a>

          <a routerLink="/favourites" routerLinkActive="bg-blue-50 text-primary" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all group">
            <i class="fas fa-heart w-5 text-center group-hover:text-primary transition-colors"></i>
            <span class="font-medium text-sm">Wishlist</span>
          </a>

          <div class="pt-6 pb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">System</div>

          <a routerLink="/health" routerLinkActive="bg-blue-50 text-primary" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all group">
            <i class="fas fa-heartbeat w-5 text-center group-hover:text-primary transition-colors"></i>
            <span class="font-medium text-sm">Health</span>
          </a>
        </nav>

        <div class="p-4 border-t border-gray-100">
          <div class="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
            <img src="https://ui-avatars.com/api/?name=Admin+User&background=2563EB&color=fff" class="w-9 h-9 rounded-full shadow-sm" alt="Profile">
            <div class="flex-1 overflow-hidden">
              <div class="text-sm font-semibold text-gray-700 truncate">Admin User</div>
              <div class="text-xs text-gray-500 truncate">admin@kylink.com</div>
            </div>
            <i class="fas fa-chevron-right text-xs text-gray-400"></i>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 ml-64 flex flex-col min-h-screen relative z-10">
        <!-- Header -->
        <header class="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-20 shadow-sm/50">
          <div class="flex items-center gap-4">
             <h2 class="text-xl font-semibold text-gray-800">
                Welcome back, <span class="text-primary">Admin</span>
             </h2>
          </div>
          
          <div class="flex items-center gap-4">
             <button class="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-primary transition-colors relative flex items-center justify-center border border-gray-200/50">
               <i class="fas fa-search"></i>
            </button>
            <button class="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-primary transition-colors relative flex items-center justify-center border border-gray-200/50">
              <i class="fas fa-bell"></i>
              <span class="absolute top-2.5 right-2.5 w-2 h-2 bg-danger rounded-full ring-2 ring-white"></span>
            </button>
            <div class="h-8 w-px bg-gray-200 mx-2"></div>
            <button class="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Logout</button>
          </div>
        </header>

        <!-- Content Area -->
        <div class="flex-1 p-8 bg-gray-50 overflow-y-auto scroll-smooth">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `
})
export class LayoutComponent { }
