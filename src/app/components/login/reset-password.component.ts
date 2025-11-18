import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';
import { ErrorMessageComponent } from '../../shared/components/error-message/error-message.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FormFieldComponent,
    ErrorMessageComponent,
    ButtonComponent
  ]
})
export class ResetPasswordComponent {
  email = '';
  token = ''; // OTP
  newPassword = '';
  confirmPassword = '';
  message = '';
  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = '';
    this.message = '';

    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    this.loading = true;
    this.auth.resetPassword(this.email, this.token, this.newPassword).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.message = res?.message || 'Password reset successful. Redirecting to login...';
        setTimeout(() => this.router.navigateByUrl('/login'), 1500);
      },
      error: err => {
        this.loading = false;
        this.error = err.error || 'Reset failed';
      }
    });
  }
}
