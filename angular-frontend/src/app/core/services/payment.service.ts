import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Payment {
    paymentId?: number;
    isPayed?: boolean;
    paymentStatus?: string;
    orderId: number;
    userId: number;
    // Optional nested DTOs if needed for display
    orderDto?: any;
    userDto?: any;
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

    createPayment(payment: Payment): Observable<Payment> {
        return this.http.post<Payment>(this.apiUrl, payment);
    }
}
