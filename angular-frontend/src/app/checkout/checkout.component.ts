import { Component, AfterViewInit, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';

declare var paypal: any; // Important: Declare paypal to avoid TypeScript errors

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CheckoutComponent implements AfterViewInit, OnInit {

  private cartService = inject(CartService);
  total = '0.00';

  constructor() { }

  ngOnInit(): void {
    // In a real application, you would get the cart ID from the user's session.
    const cartId = 1;
    this.cartService.getCart(cartId).subscribe((cart: any) => {
      const total = cart.orderDtos.reduce((acc: number, item: any) => acc + (item.orderFee * item.quantity), 0);
      this.total = total.toFixed(2);
      this.renderPayPalButton();
    });
  }

  ngAfterViewInit(): void {
    this.loadPayPalScript();
  }

  loadPayPalScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      // Replace with your client ID. This is a placeholder.
      script.src = 'https://www.paypal.com/sdk/js?client-id=AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXxBKPiXRj_xomcg4Sj_2cf_g_a_p_3y1a_2j_2k_2l_2m';
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.body.appendChild(script);
    });
  }

  renderPayPalButton(): void {
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.total
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          alert('Transaction completed by ' + details.payer.name.given_name);
        });
      },
      onError: (err: any) => {
        console.error('PayPal Error:', err);
      }
    }).render('#paypal-button-container');
  }
}
