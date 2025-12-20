import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen bg-dark text-white flex relative overflow-hidden">
      <!-- Background Elements -->
      <div class="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div class="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-pulse-glow"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] animate-pulse-glow" style="animation-delay: 1s;"></div>
      </div>

      <!-- Sidebar -->
      <aside class="w-64 glass-effect border-r border-white/10 flex flex-col z-20 transition-all duration-300">
        <div class="p-6 flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span class="font-bold text-white">G</span>
          </div>
          <h1 class="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Antigravity
          </h1>
        </div>

        <nav class="flex-1 px-4 space-y-2 overflow-y-auto py-4">
          <a routerLink="/dashboard" routerLinkActive="bg-white/10 text-accent" class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
            <i class="fas fa-home w-5 group-hover:text-accent transition-colors"></i>
            <span class="font-medium">Dashboard</span>
          </a>
          
          <div class="pt-4 pb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Services</div>
          
          <a routerLink="/products" routerLinkActive="bg-white/10 text-accent" class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
            <i class="fas fa-box w-5 group-hover:text-primary transition-colors"></i>
            <span>Products</span>
          </a>
          
          <a routerLink="/orders" routerLinkActive="bg-white/10 text-accent" class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
            <i class="fas fa-shopping-cart w-5 group-hover:text-primary transition-colors"></i>
            <span>Orders</span>
          </a>
          
          <a routerLink="/inventory" routerLinkActive="bg-white/10 text-accent" class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
            <i class="fas fa-boxes w-5 group-hover:text-primary transition-colors"></i>
            <span>Inventory</span>
          </a>

          <a routerLink="/users" routerLinkActive="bg-white/10 text-accent" class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
            <i class="fas fa-users w-5 group-hover:text-primary transition-colors"></i>
            <span>Users</span>
          </a>

          <a routerLink="/payments" routerLinkActive="bg-white/10 text-accent" class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
            <i class="fas fa-credit-card w-5 group-hover:text-primary transition-colors"></i>
            <span>Payments</span>
          </a>

          <a routerLink="/shipping" routerLinkActive="bg-white/10 text-accent" class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
            <i class="fas fa-truck w-5 group-hover:text-primary transition-colors"></i>
            <span>Shipping</span>
          </a>

          <a routerLink="/notifications" routerLinkActive="bg-white/10 text-accent" class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
            <i class="fas fa-bell w-5 group-hover:text-primary transition-colors"></i>
            <span>Notifications</span>
          </a>

          <a routerLink="/favourites" routerLinkActive="bg-white/10 text-accent" class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
            <i class="fas fa-heart w-5 group-hover:text-primary transition-colors"></i>
            <span>Wishlist</span>
          </a>

          <a routerLink="/ratings" routerLinkActive="bg-white/10 text-accent" class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
            <i class="fas fa-star w-5 group-hover:text-primary transition-colors"></i>
            <span>Reviews</span>
          </a>

          <a routerLink="/tax" routerLinkActive="bg-white/10 text-accent" class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
            <i class="fas fa-percentage w-5 group-hover:text-primary transition-colors"></i>
            <span>Tax</span>
          </a>
          <a routerLink="/promotions" routerLinkActive="bg-white/10 text-accent" class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
            <i class="fas fa-tags w-5 group-hover:text-primary transition-colors"></i>
            <span>Promotions</span>
          </a>

          <a routerLink="/search" routerLinkActive="bg-white/10 text-accent" class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
            <i class="fas fa-search w-5 group-hover:text-primary transition-colors"></i>
            <span>Search</span>
          </a>
          
          <div class="pt-4 pb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">System</div>

          <a routerLink="/health" routerLinkActive="bg-white/10 text-accent" class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
            <i class="fas fa-heartbeat w-5 group-hover:text-primary transition-colors"></i>
            <span>Service Health</span>
          </a>

          <a routerLink="/api-test" routerLinkActive="bg-white/10 text-accent" class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
            <i class="fas fa-terminal w-5 group-hover:text-primary transition-colors"></i>
            <span>API Tester</span>
          </a>
          
          <!-- Add other links here -->
        </nav>

        <div class="p-4 border-t border-white/10">
          <div class="flex items-center gap-3 px-4 py-2">
            <div class="w-8 h-8 rounded-full bg-gradient-to-r from-secondary to-pink-500"></div>
            <div>
              <div class="text-sm font-medium">Admin User</div>
              <div class="text-xs text-green-400">Online</div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        <!-- Topbar -->
        <header class="h-16 glass-effect border-b border-white/10 flex items-center justify-between px-8 z-20">
          <div class="text-gray-400">
            Welcome back, <span class="text-white font-semibold">Commander</span>
          </div>
          <div class="flex items-center gap-4">
            <button class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors text-gray-400 hover:text-white relative">
              <i class="fas fa-bell"></i>
              <span class="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full animate-pulse"></span>
            </button>
            <button class="px-4 py-2 rounded-lg bg-primary/20 text-primary border border-primary/20 hover:bg-primary/30 transition-all text-sm font-medium">
              Logout
            </button>
          </div>
        </header>

        <!-- Content Area -->
        <div class="flex-1 overflow-y-auto p-8 scroll-smooth">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `
})
export class LayoutComponent { }
