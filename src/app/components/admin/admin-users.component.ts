import { Component, OnInit } from '@angular/core';
import { AdminService, User, PermissionsDto } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error = '';
  selectedUser: User | null = null;
  showPermissionsModal = false;
  permissions: PermissionsDto = {
    canManageProducts: false,
    canViewAdminOrders: false,
    canManageUsers: false
  };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(page: number = 1): void {
    this.loading = true;
    this.error = '';
    this.adminService.getUsers('', page, 10).subscribe({
      next: res => {
        this.users = res.items;
        this.loading = false;
      },
      error: (err) => {
        console.error('Load users error:', err);
        this.error = 'Failed to load users. Please try again.';
        this.loading = false;
      }
    });
  }

  updateRole(user: User, event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newRole = target.value;
    if (user.role === newRole) return;

    this.adminService.updateRole(user.id, newRole).subscribe({
      next: () => {
        user.role = newRole;
        this.error = '';
      },
      error: (err) => {
        console.error('Update role error:', err);
        this.error = 'Failed to update user role. Please try again.';
      }
    });
  }

  openPermissionsModal(user: User): void {
    this.selectedUser = user;
    this.permissions = {
      canManageProducts: user.permissions?.canManageProducts ?? false,
      canViewAdminOrders: user.permissions?.canViewAdminOrders ?? false,
      canManageUsers: user.permissions?.canManageUsers ?? false
    };
    this.showPermissionsModal = true;
  }

  closePermissionsModal(): void {
    this.showPermissionsModal = false;
    this.selectedUser = null;
  }

  savePermissions(): void {
    if (!this.selectedUser) return;

    this.adminService.updatePermissions(this.selectedUser.id, this.permissions).subscribe({
      next: () => {
        if (this.selectedUser) {
          this.selectedUser.permissions = { ...this.permissions };
        }
        this.closePermissionsModal();
        this.error = '';
      },
      error: (err) => {
        console.error('Update permissions error:', err);
        this.error = 'Failed to update permissions. Please try again.';
      }
    });
  }

  trackByUserId(index: number, user: User): number {
    return user.id;
  }

  get adminCount(): number {
    return this.users.filter(u => u.role === 'Admin').length;
  }

  get userCount(): number {
    return this.users.filter(u => u.role === 'User').length;
  }
}
