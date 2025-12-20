import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
    id?: number;
    name: string;
    sku: string;
    price: number;
    quantity: number;
    description: string;
    imageUrl?: string;
    categoryId?: number;
}

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8086/api/products'; // Product Service

    getProducts(page: number = 0, size: number = 10, search?: string): Observable<any> {
        let params = new HttpParams()
            .set('page', page)
            .set('size', size);

        if (search) {
            params = params.set('search', search);
        }

        return this.http.get<any>(this.apiUrl, { params });
    }

    getProduct(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/${id}`);
    }

    createProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(this.apiUrl, product);
    }

    updateProduct(id: number, product: Product): Observable<Product> {
        return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
    }

    deleteProduct(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    getCategories(): Observable<any[]> {
        return this.http.get<any[]>('http://localhost:8086/api/categories');
    }
}
