import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
    id?: number;
    orderId?: string; // or number, backend uses Integer
    productId: string; // or number, backend uses Integer
    orderFee: number;
    quantity: number;
    email: string;
    orderDate?: string;
    orderDesc?: string;
    status?: string;
}

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/order`; // Order Service

    getOrders(page: number = 0, size: number = 10): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    placeOrder(order: any): Observable<string> {
        return this.http.post<string>(this.apiUrl, order);
    }
}
