import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Shipping {
    id?: number;
    orderId: number;
    paymentId: number;
    trackingNumber?: string;
    shippingStatus: string;
}

@Injectable({
    providedIn: 'root'
})
export class ShippingService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8087/api/shipping'; // Shipping Service

    getShipments(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}
