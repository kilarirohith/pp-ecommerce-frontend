import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';
import { ErrorMessageComponent } from '../../shared/components/error-message/error-message.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FormFieldComponent,
    ErrorMessageComponent,
    ButtonComponent
  ]
})
export class ForgotPasswordComponent {
  email = '';
  message = '';
  error = '';
  loading = false;

  constructor(private auth: AuthService) {}

  submit() {
    this.error = '';
    this.message = '';

    if (!this.email) {
      this.error = 'Email is required';
      return;
    }

    this.loading = true;
    this.auth.requestPasswordReset(this.email).subscribe({
      next: () => {
        this.loading = false;
        this.message = 'If the email exists, we have sent an OTP to that email.';
      },
      error: err => {
        this.loading = false;
        this.error = err.error || 'Request failed';
      }
    });
  }
}
