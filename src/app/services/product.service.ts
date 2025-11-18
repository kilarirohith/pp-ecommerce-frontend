import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';

interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getAll(search?: string, page: number = 1, pageSize: number = 10): Observable<PaginatedResult<Product>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (search && search.trim()) {
      params = params.set('search', search.trim());
    }

    return this.http.get<PaginatedResult<Product>>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(form: {
    name: string;
    description?: string;
    price: number;
    stock: number;
    imageFile?: File | null;
  }): Observable<Product> {
    const fd = new FormData();
    fd.append('Name', form.name);
    fd.append('Price', String(form.price));
    fd.append('Stock', String(form.stock));
    if (form.description) {
      fd.append('Description', form.description);
    }
    if (form.imageFile) {
      fd.append('ImageFile', form.imageFile);
    }

    return this.http.post<Product>(this.apiUrl, fd);
  }

  update(id: number, form: {
    name: string;
    description?: string;
    price: number;
    stock: number;
    imageFile?: File | null;
  }): Observable<void> {
    const fd = new FormData();
    fd.append('Name', form.name);
    fd.append('Price', String(form.price));
    fd.append('Stock', String(form.stock));
    if (form.description) {
      fd.append('Description', form.description);
    }
    if (form.imageFile) {
      fd.append('ImageFile', form.imageFile);
    }

    return this.http.put<void>(`${this.apiUrl}/${id}`, fd);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
