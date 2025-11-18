import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { AuthResponse } from './models/auth.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule]
})
export class AppComponent {
  user$: Observable<AuthResponse | null>;

  constructor(public auth: AuthService) {
    this.user$ = this.auth.currentUser$;
  }

  logout() {
    this.auth.logout();
  }
}
