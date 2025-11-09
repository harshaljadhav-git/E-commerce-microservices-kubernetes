import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Placeholder data
    this.cartItems = [
      { id: 1, name: 'Classic White T-Shirt', price: 29.99, quantity: 2, image: 'https://via.placeholder.com/150x150.png?text=T-Shirt' },
      { id: 2, name: 'Slim Fit Jeans', price: 89.99, quantity: 1, image: 'https://via.placeholder.com/150x150.png?text=Jeans' },
    ];
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  updateQuantity(itemId: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const quantity = parseInt(input.value, 10);
    const item = this.cartItems.find(i => i.id === itemId);
    if (item) {
      item.quantity = quantity;
      this.calculateTotal();
    }
  }

  removeItem(itemId: number): void {
    this.cartItems = this.cartItems.filter(i => i.id !== itemId);
    this.calculateTotal();
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }
}
