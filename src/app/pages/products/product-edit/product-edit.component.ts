import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  standalone: false
})
export class ProductEditComponent implements OnInit {
  model: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(id).subscribe(product => this.model = product);
  }

  onSubmit() {
    if (!this.model.id) return;
    this.productService.updateProduct(this.model.id, this.model).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}
