import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'http://13.127.245.214:8080/api/carts'; // Assuming order-service runs on port 8082

  constructor(private http: HttpClient) { }

  getCart(cartId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${cartId}`);
  }

  addToCart(cart: any): Observable<any> {
    return this.http.post(this.baseUrl, cart);
  }
}
