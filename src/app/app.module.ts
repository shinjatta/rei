import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';    

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResultadoBusquedaComponent } from './resultado-busqueda/resultado-busqueda.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from './error/error.component';
import { ExercicesContextComponent } from './exercices-context/exercices-context.component';

import { ExercicesImagesComponent } from './exercices-images/exercices-images.component';
import { ExercicesListeningComponent } from './exercices-listening/exercices-listening.component';
import { ExercicesKanjiComponent } from './exercices-kanji/exercices-kanji.component';
import { ExercicesUsageComponent } from './exercices-usage/exercices-usage.component';

@NgModule({
  declarations: [
    AppComponent,
    ResultadoBusquedaComponent,
    HomeComponent,
    ErrorComponent,
    ExercicesContextComponent,
    ExercicesImagesComponent,
    ExercicesListeningComponent,
    ExercicesKanjiComponent,
    ExercicesUsageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
