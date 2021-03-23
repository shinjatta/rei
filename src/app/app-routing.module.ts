import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResultadoBusquedaComponent } from './resultado-busqueda/resultado-busqueda.component';

const routes: Routes = [
  {//Cuando no ponga nada
    path: '',
    component: HomeComponent,
  },
  {//Cuando ponga noticias
    path: 'search',
    component: ResultadoBusquedaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
