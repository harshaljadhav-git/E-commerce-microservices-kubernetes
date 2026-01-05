import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService, InventoryItem } from '../../core/services/inventory.service';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-8 animate-fade-in relative z-10">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-bold text-black tracking-tight">
            Product Inventory
          </h1>
          <p class="text-gray-700 mt-1">Manage your catalog, stock levels, and pricing.</p>
        </div>
        <button class="bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/40 transition-all transform hover:-translate-y-0.5 flex items-center gap-2">
          <i class="fas fa-plus"></i> New Product
        </button>
      </div>

      <!-- Search & Filters -->
      <div class="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
        <div class="relative flex-1 w-full">
            <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"></i>
            <input type="text" placeholder="Search by SKU, Name or Category..." 
            class="w-full pl-11 pr-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/10 rounded-xl outline-none transition-all placeholder-gray-600 text-black font-medium">
        </div>
        <div class="flex gap-2 w-full md:w-auto p-1">
            <button class="flex-1 md:flex-none px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-800 rounded-xl font-medium transition-colors border border-transparent hover:border-gray-200 flex items-center justify-center gap-2">
                <i class="fas fa-filter"></i> Filters
            </button>
            <button class="flex-1 md:flex-none px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-800 rounded-xl font-medium transition-colors border border-transparent hover:border-gray-200 flex items-center justify-center gap-2">
                <i class="fas fa-sort-amount-down"></i> Sort
            </button>
        </div>
      </div>

      <!-- Product Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        <div *ngFor="let item of inventory" class="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-100/50 hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer relative overflow-hidden">
            
            <!-- Image Area -->
            <div class="aspect-[4/3] bg-gray-50 rounded-xl mb-5 flex items-center justify-center relative overflow-hidden group-hover:bg-gray-100 transition-colors">
                <i class="fas fa-box-open text-4xl text-gray-300 group-hover:scale-110 transition-transform duration-500"></i>
                <div class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div class="space-y-4">
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="font-bold text-black text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
                            {{ item.skuCode }}
                        </h3>
                        <p class="text-sm text-gray-700 font-medium">Electronics</p>
                    </div>
                    <span class="font-bold text-primary bg-primary/5 px-3 py-1 rounded-lg text-sm">
                        $999.00
                    </span>
                </div>

                <div class="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full" 
                        [ngClass]="{
                            'bg-emerald-500': item.quantity > 50,
                            'bg-amber-500': item.quantity <= 50 && item.quantity > 0,
                            'bg-red-500': item.quantity === 0
                        }"></span>
                        <span class="text-sm font-semibold"
                        [ngClass]="{
                            'text-emerald-700': item.quantity > 50,
                            'text-amber-700': item.quantity <= 50 && item.quantity > 0,
                            'text-red-700': item.quantity === 0
                        }">
                           {{ item.quantity > 0 ? item.quantity + ' in stock' : 'Out of Stock' }}
                        </span>
                    </div>
                    <span class="text-xs font-mono text-gray-600 bg-gray-50 px-2 py-1 rounded">
                        SKU: {{item.skuCode}}
                    </span>
                </div>
            </div>
            
            <!-- Hover Action Overlay -->
            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
                <button class="w-8 h-8 rounded-full bg-white shadow-md text-gray-600 hover:text-primary flex items-center justify-center transition-colors">
                    <i class="fas fa-ellipsis-v text-xs"></i>
                </button>
            </div>
        </div>

        <!-- Add New Placeholder Card (dashed) -->
        <div class="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group h-full min-h-[340px]">
            <div class="w-16 h-16 rounded-full bg-gray-50 group-hover:bg-primary/10 flex items-center justify-center transition-colors mb-2">
                <i class="fas fa-plus text-2xl text-gray-400 group-hover:text-primary"></i>
            </div>
            <div>
                <h3 class="font-bold text-black">Add New Product</h3>
                <p class="text-sm text-gray-700 mt-1">Create a new SKU entry</p>
            </div>
        </div>

      </div>

    </div>
  `
})
export class InventoryListComponent implements OnInit {
  private inventoryService = inject(InventoryService);
  inventory: InventoryItem[] = [];

  ngOnInit() {
    this.loadInventory();
  }

  loadInventory() {
    this.inventoryService.getInventory().subscribe({
      next: (data) => {
        this.inventory = Array.isArray(data) ? data : [];
      },
      error: (err) => {
        console.error('Failed to load inventory', err);
        // Mock data for visual dev
        this.inventory = [
          { skuCode: 'IPHONE-15-PRO', quantity: 120 },
          { skuCode: 'MACBOOK-AIR-M2', quantity: 45 },
          { skuCode: 'PS5-CONSOLE', quantity: 5 },
          { skuCode: 'XBOX-SERIES-X', quantity: 0 },
          { skuCode: 'AIRPODS-PRO', quantity: 200 },
          { skuCode: 'SAMSUNG-S24', quantity: 80 }
        ];
      }
    });
  }
}
