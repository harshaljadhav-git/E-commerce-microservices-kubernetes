import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
    id?: number;
    orderNumber: string;
    skuCode: string;
    price: number;
    quantity: number;
    email: string;
    orderDate?: string;
    status: string;
}

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8084/api/order'; // Order Service

    getOrders(page: number = 0, size: number = 10): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    placeOrder(order: any): Observable<string> {
        return this.http.post<string>(this.apiUrl, order);
    }
}
