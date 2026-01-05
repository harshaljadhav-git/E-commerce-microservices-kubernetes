import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="min-h-screen bg-gray-900 text-white font-sans selection:bg-primary selection:text-white overflow-hidden">
      
      <!-- Navbar (Transparent Absolute) -->
      <nav class="absolute top-0 w-full z-50 px-8 py-6 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
            <span class="font-bold text-xl text-white">K</span>
          </div>
          <span class="text-2xl font-bold tracking-tight">Kylink</span>
        </div>
        <div class="flex items-center gap-6">
          <a routerLink="/auth" class="text-gray-300 hover:text-white transition-colors font-medium">Log in</a>
          <a routerLink="/auth" class="bg-white text-black px-6 py-2.5 rounded-full font-bold hover:bg-gray-100 transition-all hover:scale-105 active:scale-95">Sign Up</a>
        </div>
      </nav>

      <!-- Hero Section -->
      <div class="relative h-screen flex items-center justify-center px-6">
        <!-- Background Elements -->
        <div class="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div class="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent/20 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>

        <div class="relative z-10 max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <!-- Text Content -->
          <div class="space-y-8 animate-slide-up">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span class="text-sm font-medium text-gray-300">New Collection Available</span>
            </div>
            
            <h1 class="text-6xl lg:text-7xl font-bold leading-tight">
              Future of <br>
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-300% animate-gradient">Digital Commerce</span>
            </h1>
            
            <p class="text-xl text-gray-400 max-w-lg leading-relaxed">
              Experience the next generation of online shopping. Microservices architecture meets premium design.
            </p>

            <div class="flex flex-wrap gap-4">
              <a routerLink="/products" class="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-1 flex items-center gap-2 group">
                Shop Now
                <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </a>
              <a routerLink="/dashboard" class="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-xl font-bold text-lg transition-all backdrop-blur-md">
                Admin Demo
              </a>
            </div>

            <div class="flex items-center gap-8 pt-8 border-t border-white/10">
              <div>
                <p class="text-3xl font-bold">14+</p>
                <p class="text-sm text-gray-500 uppercase tracking-wider">Microservices</p>
              </div>
              <div>
                <p class="text-3xl font-bold">99.9%</p>
                <p class="text-sm text-gray-500 uppercase tracking-wider">Uptime</p>
              </div>
              <div>
                <p class="text-3xl font-bold">AWS</p>
                <p class="text-sm text-gray-500 uppercase tracking-wider">Cloud Native</p>
              </div>
            </div>
          </div>

          <!-- Visual/Image -->
          <div class="relative hidden lg:block animate-float">
            <div class="relative z-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 p-6 rounded-3xl shadow-2xl rotate-6 hover:rotate-3 transition-transform duration-500">
               <div class="aspect-[4/3] bg-black/40 rounded-2xl overflow-hidden relative">
                  <div class="absolute inset-0 bg-gradient-to-tr from-primary/40 to-accent/40 opacity-50 mix-blend-overlay"></div>
                  <!-- Abstract UI Representation -->
                  <div class="p-6 space-y-4">
                    <div class="flex justify-between items-center">
                      <div class="w-1/3 h-4 bg-white/20 rounded"></div>
                      <div class="w-8 h-8 rounded-full bg-white/20"></div>
                    </div>
                    <div class="flex gap-4">
                      <div class="w-1/3 aspect-[3/4] bg-white/10 rounded-xl"></div>
                      <div class="w-1/3 aspect-[3/4] bg-white/10 rounded-xl"></div>
                      <div class="w-1/3 aspect-[3/4] bg-white/10 rounded-xl"></div>
                    </div>
                     <div class="h-32 bg-white/5 rounded-xl border border-white/5 mt-4 p-4">
                        <div class="w-1/2 h-4 bg-white/20 rounded mb-2"></div>
                        <div class="w-3/4 h-3 bg-white/10 rounded"></div>
                     </div>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  `,
    styles: [`
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    .animate-float { animation: float 6s ease-in-out infinite; }
    
    @keyframes pulse-slow {
      0%, 100% { opacity: 0.5; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.05); }
    }
    .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
  `]
})
export class HomeComponent { }
