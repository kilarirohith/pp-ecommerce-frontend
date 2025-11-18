import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.css']
})
export class EmptyStateComponent {
  @Input() icon: string = '📦';
  @Input() title: string = 'No items found';
  @Input() message: string = 'There are no items to display at the moment.';
  @Input() actionText: string = '';
  @Input() actionLink: string = '';
}
