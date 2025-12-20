import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Promotion {
    id?: number;
    code: string;
    discount: number;
    expiryDate: string;
}

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PromotionService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/promotions`; // Promotion Service

    getPromotions(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}
