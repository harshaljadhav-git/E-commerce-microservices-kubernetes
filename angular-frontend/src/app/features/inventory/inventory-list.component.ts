import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService, InventoryItem } from '../../core/services/inventory.service';

@Component({
    selector: 'app-inventory-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="space-y-6 animate-float">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Inventory Control
          </h1>
          <p class="text-gray-400">Monitor and update stock levels</p>
        </div>
        <div class="flex gap-2">
            <button class="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/20 px-4 py-2 rounded-lg font-medium transition-all">
            <i class="fas fa-sync"></i> Sync Stock
            </button>
        </div>
      </div>

      <div class="glass-card overflow-hidden">
        <table class="w-full text-left">
          <thead class="bg-white/5 text-gray-400 text-xs uppercase font-medium">
            <tr>
              <th class="px-6 py-4">SKU Code</th>
              <th class="px-6 py-4">Quantity</th>
              <th class="px-6 py-4">Status</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/10">
            <tr *ngFor="let item of inventory" class="hover:bg-white/5 transition-colors">
              <td class="px-6 py-4 text-white font-mono">{{item.skuCode}}</td>
              <td class="px-6 py-4 text-white font-bold">{{item.quantity}}</td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 rounded text-xs font-medium" 
                [ngClass]="{
                    'bg-green-500/20 text-green-500': item.quantity > 10,
                    'bg-yellow-500/20 text-yellow-500': item.quantity <= 10 && item.quantity > 0,
                    'bg-red-500/20 text-red-500': item.quantity === 0
                }">
                  {{ item.quantity > 0 ? 'In Stock' : 'Out of Stock' }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <button class="text-accent hover:text-white transition-colors mr-2"><i class="fas fa-edit"></i></button>
              </td>
            </tr>
             <!-- Empty State -->
             <tr *ngIf="inventory.length === 0">
                <td colspan="4" class="px-6 py-12 text-center text-gray-500">
                    <i class="fas fa-boxes text-4xl mb-3 opacity-50"></i>
                    <p>No inventory records found</p>
                </td>
            </tr>
          </tbody>
        </table>
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
                // Mock data
                this.inventory = [
                    { skuCode: 'CP-2077', quantity: 45 },
                    { skuCode: 'QP-9000', quantity: 5 },
                    { skuCode: 'HD-4K', quantity: 0 },
                    { skuCode: 'IPHONE-15', quantity: 100 }
                ];
            }
        });
    }
}
