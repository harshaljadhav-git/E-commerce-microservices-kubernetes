import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface ServiceInfo {
  name: string;
  port: number;
  healthUrl: string;
  status: 'online' | 'offline' | 'checking';
  latency?: number;
  lastChecked?: Date;
  icon: string;
  category: 'gateway' | 'core' | 'support' | 'infra';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Header -->
    <header class="glass sticky top-0 z-50 border-b border-white/5">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-lg font-bold text-white tracking-tight">E-Commerce Platform</h1>
            <p class="text-xs text-slate-400 font-medium">Microservices Health Monitor</p>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <!-- Auto-refresh indicator -->
          <div class="hidden sm:flex items-center gap-2 text-xs text-slate-400 bg-white/5 px-3 py-1.5 rounded-full">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Auto-refresh {{ autoRefreshInterval }}s
          </div>

          <button
            (click)="checkAllStatuses()"
            [disabled]="isRefreshing"
            class="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 active:scale-95">
            <svg class="w-4 h-4" [class.animate-spin]="isRefreshing" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            {{ isRefreshing ? 'Checking...' : 'Refresh' }}
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-8">

      <!-- Summary Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <!-- Total Services -->
        <div class="glass rounded-2xl p-5 border border-white/5 group hover:border-indigo-500/30 transition-all duration-300">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total</span>
            <div class="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </div>
          </div>
          <div class="text-3xl font-bold text-white">{{ services.length }}</div>
          <div class="text-xs text-slate-500 mt-1">Services monitored</div>
        </div>

        <!-- Online -->
        <div class="glass rounded-2xl p-5 border border-white/5 group hover:border-emerald-500/30 transition-all duration-300">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Online</span>
            <div class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
          </div>
          <div class="text-3xl font-bold text-emerald-400">{{ onlineCount }}</div>
          <div class="text-xs text-slate-500 mt-1">Healthy services</div>
        </div>

        <!-- Offline -->
        <div class="glass rounded-2xl p-5 border border-white/5 group hover:border-red-500/30 transition-all duration-300">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Offline</span>
            <div class="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
              <svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </div>
          </div>
          <div class="text-3xl font-bold" [class.text-red-400]="offlineCount > 0" [class.text-slate-500]="offlineCount === 0">{{ offlineCount }}</div>
          <div class="text-xs text-slate-500 mt-1">Unreachable</div>
        </div>

        <!-- Uptime -->
        <div class="glass rounded-2xl p-5 border border-white/5 group hover:border-cyan-500/30 transition-all duration-300">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Uptime</span>
            <div class="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
            </div>
          </div>
          <div class="text-3xl font-bold text-cyan-400">{{ uptimePercent }}%</div>
          <div class="text-xs text-slate-500 mt-1">System health</div>
        </div>
      </div>

      <!-- Service Categories -->
      <div *ngFor="let category of categories; let catIdx = index" class="mb-8">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-1 h-6 rounded-full" [ngClass]="{
            'bg-gradient-to-b from-indigo-400 to-indigo-600': category.key === 'gateway',
            'bg-gradient-to-b from-emerald-400 to-emerald-600': category.key === 'core',
            'bg-gradient-to-b from-amber-400 to-amber-600': category.key === 'support',
            'bg-gradient-to-b from-cyan-400 to-cyan-600': category.key === 'infra'
          }"></div>
          <h2 class="text-sm font-bold text-slate-300 uppercase tracking-wider">{{ category.label }}</h2>
          <div class="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div
            *ngFor="let service of getServicesByCategory(category.key); let i = index"
            class="glass rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-all duration-300 cursor-default group animate-fade-in-up"
            [style.animation-delay.ms]="(catIdx * 100) + (i * 60)">

            <!-- Top row: icon + name + status dot -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110" [ngClass]="{
                  'bg-emerald-500/10': service.status === 'online',
                  'bg-red-500/10': service.status === 'offline',
                  'bg-amber-500/10': service.status === 'checking'
                }">
                  {{ service.icon }}
                </div>
                <div>
                  <h3 class="text-sm font-semibold text-white leading-tight">{{ service.name }}</h3>
                  <span class="text-xs font-mono text-slate-500">:{{ service.port }}</span>
                </div>
              </div>

              <!-- Status dot -->
              <div class="relative mt-1">
                <div class="w-3 h-3 rounded-full" [ngClass]="{
                  'bg-emerald-400': service.status === 'online',
                  'bg-red-400': service.status === 'offline',
                  'bg-amber-400': service.status === 'checking'
                }" [ngStyle]="{
                  'animation': service.status === 'online' ? 'pulse-green 2s infinite' :
                               service.status === 'offline' ? 'pulse-red 2s infinite' :
                               'pulse-yellow 1s infinite'
                }"></div>
              </div>
            </div>

            <!-- Status bar -->
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold uppercase tracking-wider" [ngClass]="{
                'text-emerald-400': service.status === 'online',
                'text-red-400': service.status === 'offline',
                'text-amber-400': service.status === 'checking'
              }">
                {{ service.status === 'checking' ? 'Checking...' : service.status }}
              </span>

              <span *ngIf="service.latency !== undefined && service.status === 'online'"
                    class="text-xs font-mono px-2 py-0.5 rounded-md"
                    [ngClass]="{
                      'text-emerald-300 bg-emerald-500/10': service.latency < 200,
                      'text-amber-300 bg-amber-500/10': service.latency >= 200 && service.latency < 500,
                      'text-red-300 bg-red-500/10': service.latency >= 500
                    }">
                {{ service.latency }}ms
              </span>

              <svg *ngIf="service.status === 'checking'" class="w-4 h-4 text-amber-400" style="animation: spin 1s linear infinite" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="text-center py-8 border-t border-white/5 mt-8">
        <p class="text-xs text-slate-500">
          Last checked: {{ lastCheckedTime | date:'medium' }}
          <span class="mx-2">·</span>
          E-Commerce Microservices Dashboard
        </p>
      </footer>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }

    .animate-spin {
      animation: spin 1s linear infinite;
    }

    .animate-pulse {
      animation: pulse-green 2s infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  private refreshTimer: any;
  autoRefreshInterval = 30;
  isRefreshing = false;
  lastCheckedTime = new Date();

  categories = [
    { key: 'gateway' as const, label: 'Gateway & Discovery' },
    { key: 'core' as const, label: 'Core Business Services' },
    { key: 'support' as const, label: 'Supporting Services' },
    { key: 'infra' as const, label: 'Infrastructure' }
  ];

  services: ServiceInfo[] = [
    // Gateway & Discovery
    { name: 'API Gateway', port: 8080, healthUrl: 'http://localhost:8080/actuator/health', status: 'checking', icon: '🌐', category: 'gateway' },
    { name: 'Discovery Service', port: 8761, healthUrl: 'http://localhost:8761/actuator/health', status: 'checking', icon: '🔍', category: 'gateway' },

    // Core Business
    { name: 'User Service', port: 8088, healthUrl: 'http://localhost:8088/actuator/health', status: 'checking', icon: '👤', category: 'core' },
    { name: 'Product Service', port: 8086, healthUrl: 'http://localhost:8086/actuator/health', status: 'checking', icon: '📦', category: 'core' },
    { name: 'Order Service', port: 8084, healthUrl: 'http://localhost:8084/actuator/health', status: 'checking', icon: '🛒', category: 'core' },
    { name: 'Inventory Service', port: 8082, healthUrl: 'http://localhost:8082/actuator/health', status: 'checking', icon: '📋', category: 'core' },
    { name: 'Payment Service', port: 8085, healthUrl: 'http://localhost:8085/actuator/health', status: 'checking', icon: '💳', category: 'core' },

    // Support
    { name: 'Shipping Service', port: 8087, healthUrl: 'http://localhost:8087/actuator/health', status: 'checking', icon: '🚚', category: 'support' },
    { name: 'Notification Service', port: 8083, healthUrl: 'http://localhost:8083/actuator/health', status: 'checking', icon: '🔔', category: 'support' },
    { name: 'Favourite Service', port: 8081, healthUrl: 'http://localhost:8081/actuator/health', status: 'checking', icon: '⭐', category: 'support' },
    { name: 'Rating Service', port: 8089, healthUrl: 'http://localhost:8089/actuator/health', status: 'checking', icon: '⭐', category: 'support' },
    { name: 'Tax Service', port: 8091, healthUrl: 'http://localhost:8091/actuator/health', status: 'checking', icon: '🧾', category: 'support' },
    { name: 'Promotion Service', port: 8092, healthUrl: 'http://localhost:8092/actuator/health', status: 'checking', icon: '🏷️', category: 'support' },
    { name: 'Search Service', port: 8093, healthUrl: 'http://localhost:8093/actuator/health', status: 'checking', icon: '🔎', category: 'support' },

    // Infrastructure
    { name: 'MySQL', port: 3306, healthUrl: 'http://localhost:3306', status: 'checking', icon: '🗄️', category: 'infra' },
    { name: 'MongoDB', port: 27017, healthUrl: 'http://localhost:27017', status: 'checking', icon: '🍃', category: 'infra' },
    { name: 'Kafka Broker', port: 9092, healthUrl: 'http://localhost:9092', status: 'checking', icon: '📡', category: 'infra' },
    { name: 'Elasticsearch', port: 9200, healthUrl: 'http://localhost:9200', status: 'checking', icon: '🔍', category: 'infra' },
    { name: 'Kibana', port: 5601, healthUrl: 'http://localhost:5601', status: 'checking', icon: '📊', category: 'infra' },
  ];

  get onlineCount(): number {
    return this.services.filter(s => s.status === 'online').length;
  }

  get offlineCount(): number {
    return this.services.filter(s => s.status === 'offline').length;
  }

  get uptimePercent(): string {
    const checked = this.services.filter(s => s.status !== 'checking').length;
    if (checked === 0) return '—';
    return ((this.onlineCount / checked) * 100).toFixed(0);
  }

  ngOnInit() {
    this.checkAllStatuses();
    this.refreshTimer = setInterval(() => {
      this.checkAllStatuses();
    }, this.autoRefreshInterval * 1000);
  }

  ngOnDestroy() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
    }
  }

  getServicesByCategory(category: string): ServiceInfo[] {
    return this.services.filter(s => s.category === category);
  }

  checkAllStatuses() {
    this.isRefreshing = true;
    this.lastCheckedTime = new Date();

    let pending = this.services.length;
    const done = () => {
      pending--;
      if (pending <= 0) {
        this.isRefreshing = false;
      }
    };

    this.services.forEach(service => {
      service.status = 'checking';
      const start = performance.now();

      // Use fetch with a timeout
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      fetch(service.healthUrl, {
        mode: 'no-cors',
        signal: controller.signal
      })
        .then(() => {
          clearTimeout(timeout);
          service.status = 'online';
          service.latency = Math.round(performance.now() - start);
          service.lastChecked = new Date();
          done();
        })
        .catch(() => {
          clearTimeout(timeout);
          service.status = 'offline';
          service.latency = undefined;
          service.lastChecked = new Date();
          done();
        });
    });
  }
}
