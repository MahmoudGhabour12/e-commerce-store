import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'helpers/auth.guard';
import { Role } from 'models/role';

import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { ProductsListComponent } from 'views/products-list/products-list.component';
import { UserProductsListComponent } from 'views/user-products-list/user-products-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'products',
    component: ProductsListComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  {
    path: 'user-products',
    component: UserProductsListComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.User] },
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
