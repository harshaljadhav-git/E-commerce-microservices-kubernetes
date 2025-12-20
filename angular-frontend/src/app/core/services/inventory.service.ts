import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface InventoryItem {
    id?: number;
    skuCode: string;
    quantity: number;
}

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class InventoryService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/inventory`; // Inventory Service

    getInventory(skuCode?: string): Observable<any> {
        const url = skuCode ? `${this.apiUrl}/${skuCode}` : this.apiUrl;
        return this.http.get<any>(url);
    }

    updateStock(skuCode: string, quantity: number): Observable<any> {
        return this.http.put(this.apiUrl, { skuCode, quantity });
    }

    isInStock(skuCode: string, quantity: number): Observable<boolean> {
        return this.http.get<boolean>(`${this.apiUrl}?skuCode=${skuCode}&quantity=${quantity}`);
    }
}
