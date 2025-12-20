import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Payment {
    id?: number;
    orderId: number;
    amount: number;
    paymentStatus: string;
    transactionId: string;
}

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/payments`; // Payment Service

    getPayments(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}
