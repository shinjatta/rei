import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resultado-busqueda',
  templateUrl: './resultado-busqueda.component.html',
  styleUrls: ['./resultado-busqueda.component.css']
})
export class ResultadoBusquedaComponent implements OnInit {
  search:string="";
  subscription!: Subscription;
  palabraPrincipal="";
  lectura="";
  traduccionIngles="";
  traduccionEspañol="herencia, sucesión";

  constructor(private data: DataService) { }

  buscar(){
    this.palabraPrincipal=this.search;
    this.data.getMeaning(this.palabraPrincipal)
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
  
  ngOnInit() {
  
  }


}
