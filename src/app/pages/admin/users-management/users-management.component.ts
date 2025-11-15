import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { Permissions } from '../../../core/models/permission.model';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css'],
  standalone: false
})
export class UsersManagementComponent implements OnInit {
  users: any[] = [];
  selectedUser: any | null = null;
  selectedPermissions: Permissions | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getUsers().subscribe(users => this.users = users);
  }

  changeRole(user: any, newRole: string) {
    this.adminService.updateRole(user.id, newRole as 'User' | 'Admin').subscribe(() => {
      user.role = newRole;
    });
  }

  editPermissions(user: any) {
    this.selectedUser = user;
    this.adminService.getPermissions(user.id).subscribe(perms => {
      this.selectedPermissions = { ...perms };
    });
  }

  savePermissions() {
    if (!this.selectedUser || !this.selectedPermissions) return;

    this.adminService
      .updatePermissions(this.selectedUser.id, this.selectedPermissions)
      .subscribe(() => {
        alert('Permissions updated');
        this.selectedUser = null;
        this.selectedPermissions = null;
      });
  }

  cancelPermissions() {
    this.selectedUser = null;
    this.selectedPermissions = null;
  }
}
