import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './guards/authguard.guard';
import { CreateComponent } from './components/create/create.component';
import { DetailComponent } from './components/detail/detail.component';
import { HomeComponent } from './components/home/home.component';
import { TableComponent } from './components/table/table.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', data: { title: 'Home - Food Expiry Tracker' } },
  { path: 'table', component: TableComponent, canActivate: [AuthguardGuard], data: { title: 'My Fridge - Food Expiry Tracker' } },
  { path: 'fridgeItem', component: CreateComponent, data: { title: 'Add Item - Food Expiry Tracker' } },
  { path: 'fridgeItem/:id', component: DetailComponent, data: { title: 'Edit item - Food Expiry Tracker' } },
  { path: 'login', component: LoginComponent, data: { title: 'Login - Food Expiry Tracker' } },
  { path: 'register', component: RegisterComponent, data: { title: 'Register - Food Expiry Tracker' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
