import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductCreateComponent } from './pages/products/product-create/product-create.component';
import { ProductEditComponent } from './pages/products/product-edit/product-edit.component';
import { CartComponent } from './pages/cart/cart.component';
import { MyOrdersComponent } from './pages/orders/my-orders/my-orders.component';
import { AdminOrdersComponent } from './pages/orders/admin-orders/admin-orders.component';
import { UsersManagementComponent } from './pages/admin/users-management/users-management.component';
import { AdminDashboardComponent } from './pages/admin/dashboard/admin-dashboard.component';

import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '', redirectTo: 'products', pathMatch: 'full' },

  { path: 'products', component: ProductsListComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard] },

  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'admin/products/new',
    component: ProductCreateComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'admin/products/:id/edit',
    component: ProductEditComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'admin/users',
    component: UsersManagementComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin'] }
  },

  { path: '**', redirectTo: 'products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
