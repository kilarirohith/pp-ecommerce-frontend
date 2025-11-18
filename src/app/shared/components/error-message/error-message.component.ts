import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent {
  @Input() message: string = 'An error occurred.';
  @Input() showRetry: boolean = true;
  @Input() retryText: string = 'Try Again';
  @Output() retry = new EventEmitter<void>();
}
