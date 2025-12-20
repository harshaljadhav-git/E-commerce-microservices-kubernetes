import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouriteService, Favourite } from '../../core/services/favourite.service';

@Component({
    selector: 'app-favourite-list',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="space-y-6 animate-float">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">My Wishlist</h1>
        <div class="text-sm text-gray-400">
            Keep track of products you love
        </div>
      </div>

       <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div *ngFor="let item of favourites" class="glass-card group relative overflow-hidden">
                <div class="aspect-square bg-black/30 rounded-lg mb-4 flex items-center justify-center text-gray-700">
                    <i class="fas fa-image text-4xl opacity-50"></i>
                </div>
                <div class="absolute top-2 right-2 p-2 bg-red-500/20 text-red-500 rounded-full backdrop-blur-sm cursor-pointer hover:bg-red-500 hover:text-white transition-all">
                    <i class="fas fa-heart"></i>
                </div>
                <div class="mb-2">
                    <h3 class="font-bold text-white">Product #{{item.productId}}</h3>
                    <p class="text-xs text-gray-500">Added on {{item.addedAt | date}}</p>
                </div>
                <button class="w-full py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary hover:text-white transition-all font-medium text-sm">
                    Move to Cart
                </button>
            </div>
            <!-- Empty State -->
             <div *ngIf="favourites.length === 0" class="col-span-full py-12 text-center text-gray-500">
                <i class="far fa-heart text-4xl mb-3 opacity-50"></i>
                <p>Your wishlist is empty</p>
            </div>
       </div>
    </div>
    `
})
export class FavouriteListComponent implements OnInit {
    private favouriteService = inject(FavouriteService);
    favourites: Favourite[] = [];

    ngOnInit() {
        this.favouriteService.getFavourites().subscribe({
            next: (data) => this.favourites = Array.isArray(data) ? data : [],
            error: () => {
                this.favourites = [
                    { id: 1, productId: 101, userId: 1, addedAt: new Date().toISOString() },
                    { id: 2, productId: 105, userId: 1, addedAt: new Date(Date.now() - 86400000).toISOString() }
                ];
            }
        });
    }
}
