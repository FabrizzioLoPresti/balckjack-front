import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartaComponent } from './carta/carta.component';
import { TableroComponent } from './tablero/tablero.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgChartsModule } from 'ng2-charts';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReportesComponent } from './reportes/reportes.component';

@NgModule({
  declarations: [
    AppComponent,
    CartaComponent,
    TableroComponent,
    LoginComponent,
    RegistroComponent,
    ReportesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    SweetAlert2Module.forRoot(),
    NgChartsModule,

    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
