import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { DetailComponent } from './components/detail/detail.component';
import { HomeComponent } from './components/home/home.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  {path: "", component: HomeComponent, pathMatch: 'full'},
  {path: "table", component: TableComponent},
  {path: "fridgeItem", component: CreateComponent},
  {path: "fridgeItem/:id", component: DetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
