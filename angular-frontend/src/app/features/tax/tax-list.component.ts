import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxService, Tax } from '../../core/services/tax.service';

@Component({
    selector: 'app-tax-list',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="space-y-6 animate-float">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Tax Configuration</h1>
      </div>

       <div class="glass-card overflow-hidden">
        <table class="w-full text-left">
          <thead class="bg-white/5 text-gray-400 text-xs uppercase font-medium">
            <tr>
              <th class="px-6 py-4">Location</th>
              <th class="px-6 py-4">Tax Class</th>
              <th class="px-6 py-4">Rate (%)</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/10">
            <tr *ngFor="let tax of taxes" class="hover:bg-white/5 transition-colors">
              <td class="px-6 py-4 text-white font-medium">{{tax.location}}</td>
              <td class="px-6 py-4 text-gray-400">{{tax.taxClass}}</td>
              <td class="px-6 py-4 text-accent font-mono">{{tax.rate}}%</td>
              <td class="px-6 py-4 text-right">
                <button class="text-primary hover:text-white transition-colors"><i class="fas fa-edit"></i></button>
              </td>
            </tr>
             <!-- Empty State -->
             <tr *ngIf="taxes.length === 0">
                <td colspan="4" class="px-6 py-12 text-center text-gray-500">
                    <p>No tax rates configured</p>
                </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    `
})
export class TaxListComponent implements OnInit {
    private taxService = inject(TaxService);
    taxes: Tax[] = [];

    ngOnInit() {
        this.taxService.getTaxes().subscribe({
            next: (data) => this.taxes = Array.isArray(data) ? data : [],
            error: () => {
                this.taxes = [
                    { id: 1, location: 'New York, USA', taxClass: 'Standard', rate: 8.875 },
                    { id: 2, location: 'California, USA', taxClass: 'Standard', rate: 7.25 }
                ];
            }
        });
    }
}
