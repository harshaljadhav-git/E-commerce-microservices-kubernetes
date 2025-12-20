import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../core/services/product.service';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    template: `
    <div class="space-y-6 animate-float">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Product Inventory
          </h1>
          <p class="text-gray-400">Manage your catalog with precision</p>
        </div>
        <button class="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-lg font-medium transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
          <i class="fas fa-plus"></i> New Product
        </button>
      </div>

      <!-- Filters -->
      <div class="glass-card p-4 flex flex-wrap gap-4 items-center">
        <div class="flex-1 min-w-[200px] relative">
          <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"></i>
          <input 
            type="text" 
            [(ngModel)]="searchQuery"
            (ngModelChange)="loadProducts()"
            placeholder="Search products..." 
            class="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-primary transition-all"
          >
        </div>
        <div class="flex items-center gap-2 bg-black/20 rounded-lg p-1 border border-white/10">
          <button (click)="viewMode = 'grid'" [class.bg-white_10]="viewMode === 'grid'" class="p-2 rounded hover:bg-white/5 transition-colors text-gray-400" [class.text-white]="viewMode === 'grid'">
            <i class="fas fa-th-large"></i>
          </button>
          <button (click)="viewMode = 'list'" [class.bg-white_10]="viewMode === 'list'" class="p-2 rounded hover:bg-white/5 transition-colors text-gray-400" [class.text-white]="viewMode === 'list'">
            <i class="fas fa-list"></i>
          </button>
        </div>
      </div>

      <!-- Grid View -->
      <div *ngIf="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div *ngFor="let product of products" class="glass-card group hover:bg-white/5 transition-all cursor-pointer relative overflow-hidden">
          <div class="aspect-square bg-black/30 rounded-lg mb-4 overflow-hidden relative">
            <img [src]="product.imageUrl || 'assets/placeholder.png'" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="{{product.name}}">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4 gap-2">
               <button class="bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur-sm transition-colors text-white">
                 <i class="fas fa-edit"></i>
               </button>
               <button class="bg-danger/20 hover:bg-danger/40 p-2 rounded-full backdrop-blur-sm transition-colors text-danger">
                 <i class="fas fa-trash"></i>
               </button>
            </div>
          </div>
          <div class="flex justify-between items-start mb-2">
             <h3 class="font-bold text-lg text-white truncate pr-2">{{product.name}}</h3>
             <span class="bg-primary/20 text-primary text-xs px-2 py-1 rounded font-mono">{{product.price | currency}}</span>
          </div>
          <div class="flex justify-between items-center text-sm text-gray-400">
            <span>SKU: {{product.sku}}</span>
            <span [class.text-accent]="product.quantity > 10" [class.text-danger]="product.quantity <= 10">
              {{product.quantity}} in stock
            </span>
          </div>
        </div>
      </div>

      <!-- List View -->
      <div *ngIf="viewMode === 'list'" class="glass-card overflow-hidden">
        <table class="w-full text-left">
          <thead class="bg-white/5 text-gray-400 text-xs uppercase font-medium">
            <tr>
              <th class="px-6 py-4">Product</th>
              <th class="px-6 py-4">SKU</th>
              <th class="px-6 py-4">Category</th>
              <th class="px-6 py-4">Price</th>
              <th class="px-6 py-4">Stock</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/10">
            <tr *ngFor="let product of products" class="hover:bg-white/5 transition-colors group">
              <td class="px-6 py-4 flex items-center gap-3">
                <div class="w-10 h-10 rounded bg-black/30 overflow-hidden">
                  <img [src]="product.imageUrl || 'assets/placeholder.png'" class="w-full h-full object-cover">
                </div>
                <span class="font-medium text-white">{{product.name}}</span>
              </td>
              <td class="px-6 py-4 text-gray-400 font-mono text-sm">{{product.sku}}</td>
              <td class="px-6 py-4 text-gray-400">Category</td>
              <td class="px-6 py-4 text-white font-mono">{{product.price | currency}}</td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 rounded text-xs" [class.bg-accent_20]="product.quantity > 10" [class.text-accent]="product.quantity > 10" [class.bg-danger_20]="product.quantity <= 10" [class.text-danger]="product.quantity <= 10">
                  {{product.quantity}} units
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button class="text-primary hover:text-white transition-colors"><i class="fas fa-edit"></i></button>
                  <button class="text-danger hover:text-white transition-colors"><i class="fas fa-trash"></i></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class ProductListComponent implements OnInit {
    private productService = inject(ProductService);

    products: Product[] = [];
    viewMode: 'grid' | 'list' = 'grid';
    searchQuery = '';

    ngOnInit() {
        this.loadProducts();
    }

    loadProducts() {
        // Mock data for initial rendering if API is not ready
        this.productService.getProducts(0, 50, this.searchQuery).subscribe({
            next: (data) => this.products = data.content || data, // Handle Page or List response
            error: () => {
                // Fallback mock data
                this.products = [
                    { id: 1, name: 'Neon Cyber Deck', sku: 'CP-2077', price: 299.99, quantity: 45, description: 'High performance deck', imageUrl: '' },
                    { id: 2, name: 'Quantum Processor', sku: 'QP-9000', price: 899.50, quantity: 5, description: 'Next gen computing', imageUrl: '' },
                    { id: 3, name: 'Holographic Display', sku: 'HD-4K', price: 450.00, quantity: 120, description: '3D projection unit', imageUrl: '' },
                ];
            }
        });
    }
}
