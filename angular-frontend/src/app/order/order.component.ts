import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: any[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }

}
