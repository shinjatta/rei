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
  lectura="";
  traduccionIngles="";
  traduccionEspañol="herencia, sucesión";
  subscription!: Subscription;
  
  constructor(private buscadorComponent: BuscadorComponent, private data: DataService) { }

  ngOnInit(): void {
    this.subscription = this.data.currentSearch.subscribe(search => this.palabraPrincipal = search)

    this.subscription = this.data.getMeaning(this.palabraPrincipal)
    .subscribe(
      (result:any) => {
        this.lectura=result["0"]["japanese"]["0"]["reading"];
        this.traduccionIngles=result["0"]["senses"]["0"]["english_definitions"]["0"];
        console.log(this.lectura);
        console.log(this.traduccionIngles)
      },
      (error) => {
       console.log(error);
      }
    );
  }

  
}
