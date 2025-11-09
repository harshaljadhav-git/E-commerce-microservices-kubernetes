import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var paypal: any; // Important: Declare paypal to avoid TypeScript errors

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CheckoutComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    this.loadPayPalScript().then(() => {
      paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '100.00' // Replace with the actual total
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
    });
  }

  loadPayPalScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID'; // Replace with your client ID
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.body.appendChild(script);
    });
  }
}
