import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark">
      <!-- Animated Background -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-glow"></div>
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] animate-pulse-glow" style="animation-delay: 2s"></div>
      </div>

      <!-- Login Card -->
      <div class="glass-card w-full max-w-md p-8 relative z-10 mx-4 border border-white/10">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
            <i class="fas fa-rocket text-2xl text-white"></i>
          </div>
          <h2 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Welcome Back
          </h2>
          <p class="text-gray-400 mt-2">Enter the Antigravity Control Center</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div class="space-y-2">
            <label class="text-xs font-medium text-gray-400 uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              formControlName="email"
              class="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              placeholder="admin@antigravity.io"
            >
          </div>

          <div class="space-y-2">
            <label class="text-xs font-medium text-gray-400 uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              formControlName="password"
              class="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              placeholder="••••••••"
            >
          </div>

          <button 
            type="submit" 
            [disabled]="loginForm.invalid || isLoading"
            class="w-full bg-gradient-to-r from-primary to-accent text-white font-bold py-3.5 rounded-lg shadow-lg hover:shadow-primary/25 hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
          >
            <span class="relative z-10 flex items-center justify-center gap-2">
              <span *ngIf="!isLoading">Access Dashboard</span>
              <span *ngIf="!isLoading" class="group-hover:translate-x-1 transition-transform">→</span>
              <span *ngIf="isLoading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            </span>
          </button>
        </form>

        <div class="mt-8 text-center">
          <p class="text-sm text-gray-500">
            Don't have access? <span class="text-primary hover:text-accent cursor-pointer transition-colors">Contact Administrator</span>
          </p>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = false;

  loginForm = this.fb.group({
    email: ['admin@example.com', [Validators.required, Validators.email]],
    password: ['password', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Login failed', err);
          this.isLoading = false;
          // Add toast notification here
        }
      });
    }
  }
}
