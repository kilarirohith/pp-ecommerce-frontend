import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Auth pages
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';

// Products
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductCreateComponent } from './pages/products/product-create/product-create.component';
import { ProductEditComponent } from './pages/products/product-edit/product-edit.component';

// Cart & Orders
import { CartComponent } from './pages/cart/cart.component';
import { MyOrdersComponent } from './pages/orders/my-orders/my-orders.component';
import { AdminOrdersComponent } from './pages/orders/admin-orders/admin-orders.component';

// Admin
import { UsersManagementComponent } from './pages/admin/users-management/users-management.component';
import { UserPermissionsComponent } from './pages/admin/user-permissions/user-permissions.component';
import { AdminDashboardComponent } from './pages/admin/dashboard/admin-dashboard.component';

// Shared
import { NavbarComponent } from './shared/components/navbar/navbar.component';

// Interceptor (you can stub it for now if not created yet)
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProductsListComponent,
    ProductCreateComponent,
    ProductEditComponent,
    CartComponent,
    MyOrdersComponent,
    AdminOrdersComponent,
    UsersManagementComponent,
    UserPermissionsComponent,
    AdminDashboardComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
