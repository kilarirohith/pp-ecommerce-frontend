import { Permissions } from './permission.model';

export interface AuthResponse {
  token: string;
  role: 'User' | 'Admin';
  fullName: string;
}

export interface MeResponse {
  id: number;
  fullName: string;
  email: string;
  role: 'User' | 'Admin';
  permissions: Permissions;
}
