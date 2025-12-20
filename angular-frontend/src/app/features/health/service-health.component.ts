import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ServiceStatus {
    name: string;
    url: string;
    port: number;
    status: 'ONLINE' | 'OFFLINE' | 'CHECKING';
    latency?: number;
}

@Component({
    selector: 'app-service-health',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="space-y-6 animate-float">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">System Health</h1>
        <button (click)="checkAllStatuses()" class="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-all">
            <i class="fas fa-sync mr-2"></i> Refresh
        </button>
      </div>

       <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div *ngFor="let service of services" class="glass-card p-6 flex items-center justify-between group hover:bg-white/5 transition-all">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform"
                        [ngClass]="{
                            'bg-green-500/20 text-green-500': service.status === 'ONLINE',
                            'bg-red-500/20 text-red-500': service.status === 'OFFLINE',
                            'bg-yellow-500/20 text-yellow-500': service.status === 'CHECKING'
                        }">
                        <i class="fas" [ngClass]="{
                            'fa-check': service.status === 'ONLINE',
                            'fa-times': service.status === 'OFFLINE',
                            'fa-circle-notch fa-spin': service.status === 'CHECKING'
                        }"></i>
                    </div>
                    <div>
                        <h3 class="font-bold text-white">{{service.name}}</h3>
                        <div class="text-xs text-gray-500 font-mono">Port: {{service.port}}</div>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-sm font-medium" [ngClass]="{
                            'text-green-500': service.status === 'ONLINE',
                            'text-red-500': service.status === 'OFFLINE',
                            'text-yellow-500': service.status === 'CHECKING'
                        }">{{service.status}}</div>
                    <div *ngIf="service.latency" class="text-xs text-gray-500">{{service.latency}}ms</div>
                </div>
            </div>
       </div>
    </div>
    `
})
export class ServiceHealthComponent implements OnInit {
    services: ServiceStatus[] = [
        { name: 'API Gateway', url: 'http://localhost:8080/actuator/health', port: 8080, status: 'CHECKING' },
        { name: 'Auth Service', url: 'http://localhost:8088/actuator/health', port: 8088, status: 'CHECKING' },
        { name: 'Product Service', url: 'http://localhost:8086/actuator/health', port: 8086, status: 'CHECKING' },
        { name: 'Order Service', url: 'http://localhost:8084/actuator/health', port: 8084, status: 'CHECKING' },
        { name: 'Inventory Service', url: 'http://localhost:8082/actuator/health', port: 8082, status: 'CHECKING' },
        { name: 'Payment Service', url: 'http://localhost:8085/actuator/health', port: 8085, status: 'CHECKING' },
        { name: 'Shipping Service', url: 'http://localhost:8087/actuator/health', port: 8087, status: 'CHECKING' },
        { name: 'Notification Service', url: 'http://localhost:8083/actuator/health', port: 8083, status: 'CHECKING' },
        { name: 'Favourite Service', url: 'http://localhost:8081/actuator/health', port: 8081, status: 'CHECKING' },
        { name: 'Rating Service', url: 'http://localhost:8089/actuator/health', port: 8089, status: 'CHECKING' },
        { name: 'Tax Service', url: 'http://localhost:8091/actuator/health', port: 8091, status: 'CHECKING' },
        { name: 'Promotion Service', url: 'http://localhost:8092/actuator/health', port: 8092, status: 'CHECKING' },
        { name: 'Search Service', url: 'http://localhost:8093/actuator/health', port: 8093, status: 'CHECKING' }
    ];

    ngOnInit() {
        this.checkAllStatuses();
    }

    checkAllStatuses() {
        this.services.forEach(service => {
            service.status = 'CHECKING';
            const start = Date.now();
            fetch(service.url, { mode: 'no-cors' }) // Verify connectivity even opaque
                .then(() => {
                    service.status = 'ONLINE';
                    service.latency = Date.now() - start;
                })
                .catch(() => {
                    service.status = 'OFFLINE';
                    service.latency = undefined;
                });
        });
    }
}
