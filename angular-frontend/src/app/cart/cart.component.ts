import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../cart.service';

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
  imports: [CommonModule, RouterLink]
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  total: number = 0;
  private cartService = inject(CartService);
  private router = inject(Router);

  ngOnInit(): void {
    // In a real application, you would get the cart ID from the user's session.
    // For now, we'll use a hardcoded cart ID.
    const cartId = 1; 
    this.cartService.getCart(cartId).subscribe((cart: any) => {
      this.cartItems = cart.orderDtos.map((item: any) => ({
        id: item.productId,
        name: item.productName, // Assuming the backend provides productName
        price: item.price, // Assuming the backend provides price
        quantity: item.quantity,
        image: item.imageUrl // Assuming the backend provides imageUrl
      }));
      this.calculateTotal();
    });
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
      // Here you would also call a service to update the cart on the backend
    }
  }

  removeItem(itemId: number): void {
    this.cartItems = this.cartItems.filter(i => i.id !== itemId);
    this.calculateTotal();
    // Here you would also call a service to remove the item from the cart on the backend
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }
}
