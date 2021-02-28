import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';    

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { DefinicionComponent } from './definicion/definicion.component';
import { EjemplosComponent } from './ejemplos/ejemplos.component';
import { ImagenesComponent } from './imagenes/imagenes.component';

@NgModule({
  declarations: [
    AppComponent,
    BuscadorComponent,
    DefinicionComponent,
    EjemplosComponent,
    ImagenesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    BuscadorComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
