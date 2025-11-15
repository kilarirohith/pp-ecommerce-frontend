import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Permissions } from '../models/permission.model';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private baseUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

  updateRole(userId: number, role: 'User' | 'Admin') {
    return this.http.put(`${this.baseUrl}/users/${userId}/role`, { role });
  }

  getPermissions(userId: number): Observable<Permissions> {
    return this.http.get<Permissions>(`${this.baseUrl}/users/${userId}/permissions`);
  }

  updatePermissions(userId: number, perms: Permissions) {
    return this.http.put(`${this.baseUrl}/users/${userId}/permissions`, perms);
  }
}
