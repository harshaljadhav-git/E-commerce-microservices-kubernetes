import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingService, Rating } from '../../core/services/rating.service';

@Component({
    selector: 'app-rating-list',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="space-y-6 animate-float">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Reviews & Ratings</h1>
      </div>

       <div class="glass-card overflow-hidden">
        <div class="divide-y divide-white/10">
            <div *ngFor="let review of ratings" class="p-6 hover:bg-white/5 transition-colors">
                <div class="flex justify-between items-start mb-2">
                    <div class="flex items-center gap-2">
                        <div class="flex text-yellow-500 text-sm">
                            <i *ngFor="let star of [1,2,3,4,5]" class="fas fa-star" [class.text-gray-600]="star > review.rating"></i>
                        </div>
                        <span class="text-white font-bold">{{review.rating}}.0</span>
                    </div>
                    <span class="text-xs text-gray-500">Product #{{review.productId}}</span>
                </div>
                <p class="text-gray-300 italic mb-3">"{{review.comment}}"</p>
                <div class="flex items-center gap-2 text-xs text-gray-500">
                    <i class="fas fa-user-circle"></i>
                    <span>User #{{review.userId}}</span>
                </div>
            </div>
             <!-- Empty State -->
             <div *ngIf="ratings.length === 0" class="p-12 text-center text-gray-500">
                <i class="far fa-star text-4xl mb-3 opacity-50"></i>
                <p>No reviews found</p>
            </div>
        </div>
      </div>
    </div>
    `
})
export class RatingListComponent implements OnInit {
    private ratingService = inject(RatingService);
    ratings: Rating[] = [];

    ngOnInit() {
        this.ratingService.getRatings().subscribe({
            next: (data) => this.ratings = Array.isArray(data) ? data : [],
            error: () => {
                this.ratings = [
                    { id: 1, productId: 101, userId: 2, rating: 5, comment: 'Excellent quality! Highly recommended.' },
                    { id: 2, productId: 101, userId: 3, rating: 4, comment: 'Good, but shipping was slow.' }
                ];
            }
        });
    }
}
