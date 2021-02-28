import { Component, OnInit } from '@angular/core';
import {BuscadorComponent} from '../buscador/buscador.component'

@Component({
  selector: 'app-definicion',
  templateUrl: './definicion.component.html',
  styleUrls: ['./definicion.component.css']
})
export class DefinicionComponent implements OnInit {
  palabraPrincipal="";
  lectura="けいしょう";
  traduccionIngles="inheritance, succession";
  traduccionEspañol="herencia, sucesión";
  constructor(private buscadorComponent: BuscadorComponent) { }

  ngOnInit(): void {
    this.palabraPrincipal=this.buscadorComponent.search;
  }

}
