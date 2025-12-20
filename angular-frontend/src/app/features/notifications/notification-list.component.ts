import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../../core/services/notification.service';

@Component({
    selector: 'app-notification-list',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="space-y-6 animate-float">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">System Notifications</h1>
      </div>

       <div class="glass-card overflow-hidden">
        <div class="divide-y divide-white/10">
            <div *ngFor="let note of notifications" class="p-4 hover:bg-white/5 transition-colors flex gap-4">
                <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                    <i class="fas fa-envelope"></i>
                </div>
                <div class="flex-1">
                    <h3 class="font-bold text-white mb-1">{{note.subject}}</h3>
                    <p class="text-gray-400 text-sm mb-2">{{note.message}}</p>
                    <div class="flex items-center gap-4 text-xs text-gray-500">
                        <span><i class="fas fa-user mr-1"></i> {{note.recipient}}</span>
                        <span><i class="far fa-clock mr-1"></i> {{note.sentAt | date:'medium'}}</span>
                    </div>
                </div>
            </div>
             <!-- Empty State -->
             <div *ngIf="notifications.length === 0" class="p-12 text-center text-gray-500">
                <i class="far fa-bell text-4xl mb-3 opacity-50"></i>
                <p>No notifications log found</p>
            </div>
        </div>
      </div>
    </div>
    `
})
export class NotificationListComponent implements OnInit {
    private notificationService = inject(NotificationService);
    notifications: Notification[] = [];

    ngOnInit() {
        this.notificationService.getNotifications().subscribe({
            next: (data) => this.notifications = Array.isArray(data) ? data : [],
            error: () => {
                this.notifications = [
                    { id: '1', recipient: 'user@example.com', subject: 'Order Confirmation', message: 'Your order #101 has been processed.', sentAt: new Date().toISOString() },
                    { id: '2', recipient: 'admin@antigravity.io', subject: 'Low Stock Alert', message: 'Product SKU-123 is low on stock.', sentAt: new Date(Date.now() - 3600000).toISOString() }
                ];
            }
        });
    }
}
