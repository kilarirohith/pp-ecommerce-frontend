import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class AdminProductFormComponent implements OnInit {
  isEdit = false;
  id?: number;
  name = '';
  description = '';
  price: number | null = null;
  stock: number | null = null;
  imageFile: File | null = null;
  existingImageUrl?: string;

  error = '';
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam && idParam !== 'new') {
      this.isEdit = true;
      this.id = Number(idParam);
      this.loadProduct(this.id);
    }
  }

  loadProduct(id: number) {
    this.loading = true;
    this.productService.getById(id).subscribe({
      next: (p: Product) => {
        this.name = p.name;
        this.description = p.description || '';
        this.price = p.price;
        this.stock = p.stock;
        this.existingImageUrl = p.imageUrl;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load product';
        this.loading = false;
      }
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageFile = input.files[0];
    }
  }

  submit() {
    if (!this.price || !this.stock) {
      this.error = 'Price and stock are required';
      return;
    }

    this.error = '';
    this.loading = true;

    const payload = {
      name: this.name,
      description: this.description,
      price: this.price,
      stock: this.stock,
      imageFile: this.imageFile
    };

    if (this.isEdit && this.id != null) {
      this.productService.update(this.id, payload).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/admin/products']);
        },
        error: () => {
          this.error = 'Failed to update';
          this.loading = false;
        }
      });
    } else {
      this.productService.create(payload).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/admin/products']);
        },
        error: () => {
          this.error = 'Failed to create';
          this.loading = false;
        }
      });
    }
  }
}
