import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = '/api/carts';

  constructor(private http: HttpClient) { }

  getCart(cartId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${cartId}`);
  }

  addToCart(cart: any): Observable<any> {
    return this.http.post(this.baseUrl, cart);
  }
}
