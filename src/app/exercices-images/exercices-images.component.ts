import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-exercices-images',
  templateUrl: './exercices-images.component.html',
  styleUrls: ['./exercices-images.component.css']
})
export class ExercicesImagesComponent implements OnInit {
  search:string="";
  palabraPrincipal="";
  lectura="";
  traduccionIngles="";

  /* Imagenes */
  imagen1="";
  imagen2="";
  imagen3="";
  constructor(private data: DataService,
    private _router: Router,
    private route: ActivatedRoute,) { }



  /* Busca imagenes */
  buscaUnsplash(paraula: string){
    this.data.getPhotos(paraula)
     .subscribe(
       (result:any) => {
         this.imagen1=result["results"]["0"]["urls"]["regular"];
         this.imagen2=result["results"]["1"]["urls"]["regular"];
         this.imagen3=result["results"]["2"]["urls"]["regular"];
         console.log(this.imagen1);
       },
       (error) => {
        console.log(error);
       }
     );
   }

/* Aquesta funció recull la paraula que s'ha passat i la tradueix al anglés amb l'ajuda dela api de jisho */
traducirIngles(){
  this.palabraPrincipal=this.search;
  this.data.getMeaning(this.palabraPrincipal)
  .subscribe(
    (result:any) => {
      this.lectura=result["0"]["japanese"]["0"]["reading"];
      this.traduccionIngles=result["0"]["senses"]["0"]["english_definitions"]["0"].toUpperCase();
      this.buscaUnsplash(this.traduccionIngles);
    },
    (error) => {
     console.log(error);
    }
  );
  
}

  buscar(){
    this._router.navigate(['search/', this.search]);
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.search = params['word'];
      this.traducirIngles();
    });
  }

}
