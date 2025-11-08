import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: any[] = [];
  searchTerm: string = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.productService.getProducts()
      .subscribe(data => {
        this.products = data;
      });
  }

  search(): void {
    if (this.searchTerm) {
      this.productService.searchProducts(this.searchTerm)
        .subscribe(data => {
          this.products = data;
        });
    } else {
      this.loadAll();
    }
  }
}
