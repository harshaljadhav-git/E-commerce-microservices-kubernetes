import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService, Order } from '../../core/services/order.service';

@Component({
    selector: 'app-order-list',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    template: `
    <div class="space-y-6 animate-float">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Order Management
          </h1>
          <p class="text-gray-400">Track and manage customer orders</p>
        </div>
        <button class="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-lg font-medium transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
          <i class="fas fa-plus"></i> Create Order
        </button>
      </div>

      <!-- Filters -->
      <div class="glass-card p-4 flex flex-wrap gap-4 items-center">
        <div class="flex-1 min-w-[200px] relative">
          <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"></i>
          <input 
            type="text" 
            placeholder="Search orders..." 
            class="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-primary transition-all"
          >
        </div>
        <div class="flex items-center gap-2 bg-black/20 rounded-lg p-1 border border-white/10">
            <button class="px-3 py-1.5 rounded text-sm font-medium hover:bg-white/5 transition-colors text-white bg-white/10">All</button>
            <button class="px-3 py-1.5 rounded text-sm font-medium hover:bg-white/5 transition-colors text-gray-400">Pending</button>
            <button class="px-3 py-1.5 rounded text-sm font-medium hover:bg-white/5 transition-colors text-gray-400">Completed</button>
        </div>
      </div>

      <!-- List View -->
      <div class="glass-card overflow-hidden">
        <table class="w-full text-left">
          <thead class="bg-white/5 text-gray-400 text-xs uppercase font-medium">
            <tr>
              <th class="px-6 py-4">Order ID</th>
              <th class="px-6 py-4">Customer</th>
              <th class="px-6 py-4">Product</th>
              <th class="px-6 py-4">Total</th>
              <th class="px-6 py-4">Status</th>
              <th class="px-6 py-4">Date</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/10">
            <tr *ngFor="let order of orders" class="hover:bg-white/5 transition-colors group">
              <td class="px-6 py-4 text-white font-mono">#{{order.orderNumber}}</td>
              <td class="px-6 py-4 text-gray-300">{{order.email || 'N/A'}}</td>
              <td class="px-6 py-4 text-gray-300">
                <div class="flex flex-col">
                    <span class="text-white">{{order.skuCode}}</span>
                    <span class="text-xs text-gray-500">Qty: {{order.quantity}}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-white font-mono">{{order.price * order.quantity | currency}}</td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 rounded text-xs font-medium" 
                [ngClass]="{
                    'bg-green-500/20 text-green-500': order.status === 'COMPLETED',
                    'bg-yellow-500/20 text-yellow-500': order.status === 'PENDING',
                    'bg-red-500/20 text-red-500': order.status === 'CANCELLED'
                }">
                  {{order.status || 'PENDING'}}
                </span>
              </td>
              <td class="px-6 py-4 text-gray-400 text-sm">{{order.orderDate | date:'mediumDate'}}</td>
              <td class="px-6 py-4 text-right">
                <button class="text-primary hover:text-white transition-colors"><i class="fas fa-eye"></i></button>
              </td>
            </tr>
            <!-- Empty State -->
            <tr *ngIf="orders.length === 0">
                <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                    <i class="fas fa-box-open text-4xl mb-3 opacity-50"></i>
                    <p>No orders found</p>
                </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class OrderListComponent implements OnInit {
    private orderService = inject(OrderService);

    orders: Order[] = [];

    ngOnInit() {
        this.loadOrders();
    }

    loadOrders() {
        this.orderService.getOrders().subscribe({
            next: (data) => {
                // Determine if data is wrapped in Page object or direct list
                this.orders = Array.isArray(data) ? data : (data.content || []);
            },
            error: (err) => {
                console.error('Failed to load orders', err);
                // Mock data
                this.orders = [
                    { id: 1, orderNumber: 'ORD-7782-X', skuCode: 'CP-2077', price: 299.99, quantity: 1, email: 'user@example.com', status: 'PENDING', orderDate: new Date().toISOString() },
                    { id: 2, orderNumber: 'ORD-9921-Y', skuCode: 'QP-9000', price: 899.50, quantity: 2, email: 'corp@tech.com', status: 'COMPLETED', orderDate: new Date(Date.now() - 86400000).toISOString() }
                ];
            }
        });
    }
}
