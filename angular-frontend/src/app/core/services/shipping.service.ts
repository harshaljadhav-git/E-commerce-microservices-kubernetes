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

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ShippingService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/shipping`; // Shipping Service

    getShipments(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}
