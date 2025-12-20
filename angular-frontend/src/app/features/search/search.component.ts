import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../core/services/search.service';

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="space-y-6 animate-float">
      <div class="text-center py-12">
        <h1 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-4">
            Global Search
        </h1>
        <p class="text-gray-400 mb-8">Find anything across the entire platform</p>
        
        <div class="max-w-2xl mx-auto relative">
            <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl"></i>
            <input 
                type="text" 
                [(ngModel)]="query"
                (keyup.enter)="onSearch()"
                placeholder="Search products, orders, users..." 
                class="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-4 text-white text-lg focus:outline-none focus:border-primary focus:bg-black/40 transition-all shadow-lg"
            >
            <button (click)="onSearch()" class="absolute right-2 top-2 bottom-2 px-6 rounded-full bg-primary hover:bg-primary/80 text-white font-medium transition-all">
                Search
            </button>
        </div>
      </div>

      <div *ngIf="results" class="max-w-4xl mx-auto space-y-8">
        <!-- Results Section -->
        <h2 class="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Results for "{{lastQuery}}"</h2>
        
        <div class="glass-card p-8 text-center text-gray-500">
            <p>No results found for your query.</p>
        </div>
      </div>
    </div>
    `
})
export class SearchComponent {
    private searchService = inject(SearchService);
    query = '';
    lastQuery = '';
    results: any = null;

    onSearch() {
        if (!this.query.trim()) return;
        this.lastQuery = this.query;
        this.results = {}; // Mock empty results for now
        // this.searchService.search(this.query).subscribe(...)
    }
}
