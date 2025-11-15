import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Permissions } from '../../../core/models/permission.model';

@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.css'],
  standalone: false
})
export class UserPermissionsComponent {
  @Input() permissions!: Permissions;
  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
