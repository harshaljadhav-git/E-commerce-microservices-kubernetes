import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CartService } from '../cart.service';

interface Product {
  id: number;
  productTitle: string;
  priceUnit: number;
  image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class HomeComponent implements OnInit {

  featuredProducts: Product[] = [];
  private http = inject(HttpClient);
  private cartService = inject(CartService);

  ngOnInit(): void {
    this.http.get<any[]>('/api/products').pipe(
      map(products => products.map(product => ({
        id: product.productId,
        productTitle: product.productTitle,
        priceUnit: product.priceUnit,
        image: product.imageUrl
      })))
    ).subscribe(products => {
      this.featuredProducts = products;
    });
  }

  addToCart(product: Product): void {
    // In a real application, you would have a user ID and cart ID.
    // For now, let's assume a hardcoded cart ID and user ID.
    const cart = {
      cartId: 1, // Example cart ID
      userId: 1, // Example user ID
      orderDtos: [{
        productId: product.id,
        quantity: 1
      }]
    };
    this.cartService.addToCart(cart).subscribe(() => {
      console.log(`Added ${product.productTitle} to cart.`);
    });
  }
}
