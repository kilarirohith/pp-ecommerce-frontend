import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  standalone: false
})
export class ProductCreateComponent {
  model: Product = {
    name: '',
    description: '',
    price: 0,
    stock: 0
  };

  constructor(private productService: ProductService, private router: Router) {}

  onSubmit() {
    this.productService.createProduct(this.model).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}
