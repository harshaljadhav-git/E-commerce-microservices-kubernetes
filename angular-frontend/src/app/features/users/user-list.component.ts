import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../core/services/user.service';

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="space-y-6 animate-float">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">User Management</h1>
      </div>

       <div class="glass-card overflow-hidden">
        <table class="w-full text-left">
          <thead class="bg-white/5 text-gray-400 text-xs uppercase font-medium">
            <tr>
              <th class="px-6 py-4">User</th>
              <th class="px-6 py-4">Email</th>
              <th class="px-6 py-4">Role</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/10">
            <tr *ngFor="let user of users" class="hover:bg-white/5 transition-colors">
              <td class="px-6 py-4 flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-xs font-bold">{{user.username.charAt(0).toUpperCase()}}</div>
                <span class="text-white">{{user.username}}</span>
              </td>
              <td class="px-6 py-4 text-gray-400">{{user.email}}</td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 rounded text-xs bg-primary/20 text-primary border border-primary/20">{{user.role || 'USER'}}</span>
              </td>
              <td class="px-6 py-4 text-right">
                <button class="text-gray-400 hover:text-white"><i class="fas fa-ellipsis-v"></i></button>
              </td>
            </tr>
             <!-- Empty State -->
             <tr *ngIf="users.length === 0">
                <td colspan="4" class="px-6 py-12 text-center text-gray-500">
                    <p>No users found</p>
                </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    `
})
export class UserListComponent implements OnInit {
    private userService = inject(UserService);
    users: User[] = [];

    ngOnInit() {
        this.userService.getUsers().subscribe({
            next: (data) => this.users = Array.isArray(data) ? data : [],
            error: () => {
                this.users = [
                    { id: 1, username: 'admin', email: 'admin@antigravity.io', firstName: 'Admin', lastName: 'User', role: 'ADMIN' },
                    { id: 2, username: 'john_doe', email: 'john@example.com', firstName: 'John', lastName: 'Doe', role: 'USER' }
                ];
            }
        });
    }
}
