import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
  permissions?: {
    canManageProducts: boolean;
    canViewAdminOrders: boolean;
    canManageUsers: boolean;
  };
}

export interface PermissionsDto {
  canManageProducts: boolean;
  canViewAdminOrders: boolean;
  canManageUsers: boolean;
}

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
export class AdminService {
  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  getUsers(search?: string, page: number = 1, pageSize: number = 10): Observable<PaginatedResult<User>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (search && search.trim()) {
      params = params.set('search', search.trim());
    }

    return this.http.get<PaginatedResult<User>>(`${this.apiUrl}/users`, { params });
  }

  updateRole(userId: number, role: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/users/${userId}/role`, { role });
  }

  getPermissions(userId: number): Observable<PermissionsDto> {
    return this.http.get<PermissionsDto>(`${this.apiUrl}/users/${userId}/permissions`);
  }

  updatePermissions(userId: number, permissions: PermissionsDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/users/${userId}/permissions`, permissions);
  }
}
