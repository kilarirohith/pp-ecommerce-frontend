import { Permissions } from './permission.model';

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: 'User' | 'Admin';
  permissions: Permissions;
}
