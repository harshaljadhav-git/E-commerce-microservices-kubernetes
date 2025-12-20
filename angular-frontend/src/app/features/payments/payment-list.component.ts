import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService, Payment } from '../../core/services/payment.service';

@Component({
    selector: 'app-payment-list',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="space-y-6 animate-float">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Transactions</h1>
      </div>

       <div class="glass-card overflow-hidden">
        <table class="w-full text-left">
          <thead class="bg-white/5 text-gray-400 text-xs uppercase font-medium">
            <tr>
              <th class="px-6 py-4">Transaction ID</th>
              <th class="px-6 py-4">Order ID</th>
              <th class="px-6 py-4">Amount</th>
              <th class="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/10">
            <tr *ngFor="let payment of payments" class="hover:bg-white/5 transition-colors">
              <td class="px-6 py-4 text-white font-mono text-sm">{{payment.transactionId}}</td>
              <td class="px-6 py-4 text-gray-400">#{{payment.orderId}}</td>
              <td class="px-6 py-4 text-white font-mono">{{payment.amount | currency}}</td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 rounded text-xs font-medium"
                [ngClass]="{
                    'bg-green-500/20 text-green-500': payment.paymentStatus === 'SUCCESS',
                    'bg-red-500/20 text-red-500': payment.paymentStatus === 'FAILED'
                }">{{payment.paymentStatus}}</span>
              </td>
            </tr>
             <!-- Empty State -->
             <tr *ngIf="payments.length === 0">
                <td colspan="4" class="px-6 py-12 text-center text-gray-500">
                    <p>No transactions found</p>
                </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    `
})
export class PaymentListComponent implements OnInit {
    private paymentService = inject(PaymentService);
    payments: Payment[] = [];

    ngOnInit() {
        this.paymentService.getPayments().subscribe({
            next: (data) => this.payments = Array.isArray(data) ? data : [],
            error: () => {
                this.payments = [
                    { id: 1, orderId: 101, amount: 299.99, paymentStatus: 'SUCCESS', transactionId: 'TXN-998822' },
                    { id: 2, orderId: 102, amount: 50.00, paymentStatus: 'FAILED', transactionId: 'TXN-112233' }
                ];
            }
        });
    }
}
