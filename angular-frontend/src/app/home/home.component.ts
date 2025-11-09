import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class HomeComponent implements OnInit {

  featuredProducts: Product[] = [];

  constructor() { }

  ngOnInit(): void {
    // Placeholder data
    this.featuredProducts = [
      {
        id: 1,
        name: 'Classic White T-Shirt',
        price: 29.99,
        image: 'https://via.placeholder.com/300x300.png?text=White+T-Shirt'
      },
      {
        id: 2,
        name: 'Slim Fit Jeans',
        price: 89.99,
        image: 'https://via.placeholder.com/300x300.png?text=Slim+Fit+Jeans'
      },
      {
        id: 3,
        name: 'Leather Jacket',
        price: 199.99,
        image: 'https://via.placeholder.com/300x300.png?text=Leather+Jacket'
      }
    ];
  }

  addToCart(product: Product): void {
    console.log('Added to cart:', product);
    // Later, this will interact with a cart service
  }
}
