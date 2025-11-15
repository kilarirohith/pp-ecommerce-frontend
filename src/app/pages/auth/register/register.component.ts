import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: false
})
export class RegisterComponent {
  fullName = '';
  email = '';
  password = '';
  error = '';
  success = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.error = '';
    this.success = '';
    this.auth.register(this.fullName, this.email, this.password).subscribe({
      next: () => {
        this.success = 'Registration successful. You can login now.';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: err => {
        console.error('Registration error:', err);
        this.error = err.error?.message || err.message || 'Registration failed';
      }
    });
  }
}
