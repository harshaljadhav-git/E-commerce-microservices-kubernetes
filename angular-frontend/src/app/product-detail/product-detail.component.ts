import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';

interface Product {
  productId: number;
  productTitle: string;
  priceUnit: number;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ProductDetailComponent implements OnInit {

  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProduct(+productId).subscribe((data: Product) => {
        this.product = data;
      });
    }
  }

  addToCart(quantity: string): void {
    if (this.product) {
      // In a real application, you would have a user ID and cart ID.
      // For now, let's assume a hardcoded cart ID and user ID.
      const cart = {
        cartId: 1, // Example cart ID
        userId: 1, // Example user ID
        orderDtos: [{
          productId: this.product.productId,
          quantity: +quantity
        }]
      };
      this.cartService.addToCart(cart).subscribe(() => {
        console.log(`Added ${quantity} of ${this.product!.productTitle} to cart.`);
      });
    }
  }
}
