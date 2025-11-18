import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/products/product-list.component';
import { ProductDetailComponent } from './components/products/product-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/login/register.component';
import { CartComponent } from './components/cart/cart.component';
import { MyOrdersComponent } from './components/orders/my-orders.component';
import { AdminProductListComponent } from './components/admin/admin-product-list.component';
import { AdminProductFormComponent } from './components/admin/admin-product-form.component';
import { AdminOrdersComponent } from './components/admin/admin-orders.component';
import { AdminUsersComponent } from './components/admin/admin-users.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },

  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  {path: 'forgot-password',loadComponent: () =>import('./components/login/forgot-password.component').then(c => c.ForgotPasswordComponent)},
  {path: 'reset-password',loadComponent: () =>import('./components/login/reset-password.component').then(c => c.ResetPasswordComponent)},
  {
    path: 'admin/products',
    component: AdminProductListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Admin' }
  },
  {
    path: 'admin/products/new',
    component: AdminProductFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Admin' }
  },
  {
    path: 'admin/products/:id',
    component: AdminProductFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Admin' }
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Admin' }
  },
  {
    path: 'admin/users',
    component: AdminUsersComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Admin' }
  },

  { path: '**', redirectTo: 'products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
