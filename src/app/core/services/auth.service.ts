import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, MeResponse } from '../models/auth-response.model';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = this.token;
    if (token) {
      this.fetchMe().subscribe({
        error: () => this.logout()
      });
    }
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/auth/login`, { email, password })
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
          this.fetchMe().subscribe();
        })
      );
  }

  register(fullName: string, email: string, password: string) {
    return this.http.post(`${this.baseUrl}/auth/register`, {
      fullName,
      email,
      password
    });
  }

  fetchMe() {
    return this.http.get<MeResponse>(`${this.baseUrl}/auth/me`).pipe(
      tap(user => {
        this.currentUserSubject.next(user as unknown as User);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  hasRole(role: 'User' | 'Admin'): boolean {
    const u = this.currentUserSubject.value;
    return !!u && u.role === role;
  }

  hasPermission(key: keyof User['permissions']): boolean {
    const u = this.currentUserSubject.value;
    return !!u && u.permissions && !!u.permissions[key];
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
