import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Rating {
    id?: number;
    productId: number;
    userId: number;
    rating: number;
    comment: string;
}

@Injectable({
    providedIn: 'root'
})
export class RatingService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8089/api/ratings'; // Rating Service

    getRatings(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}
