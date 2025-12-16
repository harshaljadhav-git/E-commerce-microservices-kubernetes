import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { CartService } from '../cart.service';
import { map } from 'rxjs/operators';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  private http = inject(HttpClient);
  private cartService = inject(CartService);

  ngOnInit(): void {
    this.http.get<any[]>('/api/products').pipe(
      map(products => products.map(product => ({
        id: product.productId,
        name: product.productTitle,
        price: product.priceUnit,
        image: product.imageUrl
      })))
    ).subscribe(products => {
      this.products = products;
    });
  }

  addToCart(product: Product): void {
    const cart = {
      cartId: 1, // Example cart ID
      userId: 1, // Example user ID
      orderDtos: [{
        productId: product.id,
        quantity: 1
      }]
    };
    this.cartService.addToCart(cart).subscribe(() => {
      console.log(`Added ${product.name} to cart.`);
    });
  }
}
