import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Favourite {
    id?: number;
    productId: number;
    userId: number;
    addedAt: string;
}

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FavouriteService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/favourites`; // Favourite Service

    getFavourites(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}
