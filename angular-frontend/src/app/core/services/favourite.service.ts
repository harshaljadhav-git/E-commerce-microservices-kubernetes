import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Favourite {
    id?: number;
    productId: number;
    userId: number;
    addedAt: string;
}

@Injectable({
    providedIn: 'root'
})
export class FavouriteService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8081/api/favourites'; // Favourite Service

    getFavourites(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}
