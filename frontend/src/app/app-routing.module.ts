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
  {path: "", component: HomeComponent, pathMatch: 'full'},
  {path: "table", component: TableComponent, canActivate: [AuthguardGuard]},
  {path: "fridgeItem", component: CreateComponent},
  {path: "fridgeItem/:id", component: DetailComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
