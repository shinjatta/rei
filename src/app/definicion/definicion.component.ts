import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {BuscadorComponent} from '../buscador/buscador.component'
import { DataService } from '../data.service';

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
  subscription!: Subscription;
  
  constructor(private buscadorComponent: BuscadorComponent, private data: DataService) { }

  ngOnInit(): void {
    this.subscription = this.data.currentSearch.subscribe(search => this.palabraPrincipal = search)
  }

}
