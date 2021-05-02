import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { ExercicesContextComponent } from './exercices-context/exercices-context.component';
import { ExercicesImagesComponent } from './exercices-images/exercices-images.component';
import { ExercicesKanjiComponent } from './exercices-kanji/exercices-kanji.component';
import { ExercicesListeningComponent } from './exercices-listening/exercices-listening.component';
import { ExercicesUsageComponent } from './exercices-usage/exercices-usage.component';
import { HomeComponent } from './home/home.component';
import { ResultadoBusquedaComponent } from './resultado-busqueda/resultado-busqueda.component';

const routes: Routes = [
  {//Cuando no ponga nada
    path: '',
    component: HomeComponent,
  },
   {
    path: 'search/:word',
    component: ResultadoBusquedaComponent,
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  /* Rutes exercicis */
  {
    path: 'exercices/context/:word',
    component: ExercicesContextComponent,
  },
  {
    path: 'exercices/images/:word',
    component: ExercicesImagesComponent,
  },
  {
    path: 'exercices/kanji/:word',
    component: ExercicesKanjiComponent,
  },
  {
    path: 'exercices/listening/:word',
    component: ExercicesListeningComponent,
  },
  {
    path: 'exercices/usage/:word',
    component: ExercicesUsageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
