import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import { DetailComponent } from './components/detail/detail.component';
import { CreateComponent } from './components/create/create.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './components/table/table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ExistDialogComponent } from './components/register/exist-dialog/exist-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DetailComponent,
    CreateComponent,
    HomeComponent,
    TableComponent,
    LoginComponent,
    RegisterComponent,
    ExistDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
