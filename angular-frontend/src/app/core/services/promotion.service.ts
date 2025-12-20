import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Promotion {
    id?: number;
    code: string;
    discount: number;
    expiryDate: string;
}

@Injectable({
    providedIn: 'root'
})
export class PromotionService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8092/api/promotions'; // Promotion Service

    getPromotions(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}
