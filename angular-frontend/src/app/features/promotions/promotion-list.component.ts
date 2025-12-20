import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionService, Promotion } from '../../core/services/promotion.service';

@Component({
    selector: 'app-promotion-list',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="space-y-6 animate-float">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Promotions & Coupons</h1>
        <button class="bg-accent hover:bg-accent/80 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-lg">
            Create Coupon
        </button>
      </div>

       <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div *ngFor="let promo of promotions" class="glass-card relative overflow-hidden border-l-4 border-accent">
                <div class="p-6">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <span class="text-xs text-accent uppercase tracking-wider font-bold">Coupon Code</span>
                            <h3 class="text-2xl font-mono text-white font-bold mt-1">{{promo.code}}</h3>
                        </div>
                        <div class="text-right">
                            <span class="text-4xl font-bold text-white">{{promo.discount}}%</span>
                            <span class="block text-xs text-gray-400">OFF</span>
                        </div>
                    </div>
                    <div class="flex items-center justify-between text-sm text-gray-400 mt-4 pt-4 border-t border-white/10">
                        <span><i class="far fa-clock mr-1"></i> Expires: {{promo.expiryDate | date}}</span>
                        <button class="text-white hover:text-accent"><i class="far fa-copy"></i></button>
                    </div>
                </div>
                <div class="absolute -right-6 -top-6 w-12 h-12 bg-accent/20 rounded-full blur-xl"></div>
            </div>
             <!-- Empty State -->
             <div *ngIf="promotions.length === 0" class="col-span-full py-12 text-center text-gray-500">
                <i class="fas fa-ticket-alt text-4xl mb-3 opacity-50"></i>
                <p>No active promotions</p>
            </div>
       </div>
    </div>
    `
})
export class PromotionListComponent implements OnInit {
    private promotionService = inject(PromotionService);
    promotions: Promotion[] = [];

    ngOnInit() {
        this.promotionService.getPromotions().subscribe({
            next: (data) => this.promotions = Array.isArray(data) ? data : [],
            error: () => {
                this.promotions = [
                    { id: 1, code: 'SUMMER2025', discount: 25, expiryDate: '2025-08-31' },
                    { id: 2, code: 'WELCOME10', discount: 10, expiryDate: '2025-12-31' }
                ];
            }
        });
    }
}
