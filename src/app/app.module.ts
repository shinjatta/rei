import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { DefinicionComponent } from './definicion/definicion.component';
import { EjemplosComponent } from './ejemplos/ejemplos.component';

@NgModule({
  declarations: [
    AppComponent,
    BuscadorComponent,
    DefinicionComponent,
    EjemplosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
