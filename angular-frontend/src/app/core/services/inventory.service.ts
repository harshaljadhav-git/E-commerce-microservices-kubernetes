import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

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

    getInventory(skuCode?: string): Observable<InventoryItem[]> {
        // If skuCode provided, check specific (backend api matches?) - actually backend get take list param.
        // For now, if no skuCode, call /all
        if (!skuCode) {
            return this.http.get<any[]>(`${this.apiUrl}/all`).pipe(
                map((items: any[]) => items.map((item: any) => ({
                    skuCode: item.productName,
                    quantity: item.quantity ?? 0,
                    isInStock: item.isInStock
                })))
            );
        }
        // Fallback or specific check logic if needed
        return this.http.get<any>(`${this.apiUrl}/${skuCode}`);
    }

    updateStock(skuCode: string, quantity: number): Observable<any> {
        return this.http.put(this.apiUrl, { skuCode, quantity });
    }

    isInStock(skuCode: string, quantity: number): Observable<boolean> {
        return this.http.get<boolean>(`${this.apiUrl}?skuCode=${skuCode}&quantity=${quantity}`);
    }
}
