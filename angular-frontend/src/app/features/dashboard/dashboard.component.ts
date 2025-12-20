import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="space-y-6">
      <h2 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
        System Overview
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Core Health Card -->
        <div class="glass-card hover:bg-white/5 cursor-pointer group">
          <div class="flex justify-between items-start mb-4">
            <div class="p-3 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
              <i class="fas fa-heartbeat text-xl"></i>
            </div>
            <span class="flex h-3 w-3 relative">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>
          <div class="text-gray-400 text-sm">System Health</div>
          <div class="text-2xl font-bold text-white mt-1">98.5%</div>
        </div>

        <!-- API Requests Card -->
        <div class="glass-card hover:bg-white/5 cursor-pointer group">
          <div class="flex justify-between items-start mb-4">
            <div class="p-3 rounded-lg bg-accent/10 text-accent group-hover:scale-110 transition-transform">
              <i class="fas fa-exchange-alt text-xl"></i>
            </div>
            <span class="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded">+12%</span>
          </div>
          <div class="text-gray-400 text-sm">Total Requests</div>
          <div class="text-2xl font-bold text-white mt-1">1.2M</div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent { }
