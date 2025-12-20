import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingService, Shipping } from '../../core/services/shipping.service';

@Component({
    selector: 'app-shipping-list',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="space-y-6 animate-float">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Shipping & Logistics</h1>
      </div>

       <div class="glass-card overflow-hidden">
        <table class="w-full text-left">
          <thead class="bg-white/5 text-gray-400 text-xs uppercase font-medium">
            <tr>
              <th class="px-6 py-4">Tracking #</th>
              <th class="px-6 py-4">Order ID</th>
              <th class="px-6 py-4">Status</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/10">
            <tr *ngFor="let shipment of shipments" class="hover:bg-white/5 transition-colors">
              <td class="px-6 py-4 text-white font-mono">{{shipment.trackingNumber || 'Pending'}}</td>
              <td class="px-6 py-4 text-gray-400">#{{shipment.orderId}}</td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 rounded text-xs font-medium"
                [ngClass]="{
                    'bg-green-500/20 text-green-500': shipment.shippingStatus === 'DELIVERED',
                    'bg-blue-500/20 text-blue-500': shipment.shippingStatus === 'SHIPPED',
                    'bg-yellow-500/20 text-yellow-500': shipment.shippingStatus === 'PENDING'
                }">{{shipment.shippingStatus}}</span>
              </td>
              <td class="px-6 py-4 text-right">
                <button class="text-primary hover:text-white transition-colors"><i class="fas fa-truck"></i></button>
              </td>
            </tr>
             <!-- Empty State -->
             <tr *ngIf="shipments.length === 0">
                <td colspan="4" class="px-6 py-12 text-center text-gray-500">
                    <p>No shipments found</p>
                </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    `
})
export class ShippingListComponent implements OnInit {
    private shippingService = inject(ShippingService);
    shipments: Shipping[] = [];

    ngOnInit() {
        this.shippingService.getShipments().subscribe({
            next: (data) => this.shipments = Array.isArray(data) ? data : [],
            error: () => {
                this.shipments = [
                    { id: 1, orderId: 101, paymentId: 1, trackingNumber: 'TRK-8812-ZZ', shippingStatus: 'SHIPPED' },
                    { id: 2, orderId: 102, paymentId: 2, trackingNumber: '', shippingStatus: 'PENDING' }
                ];
            }
        });
    }
}
