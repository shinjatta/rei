import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { HistorialService } from '../historial.service';

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
  hayImagenes=true;
  palabraIncorrecta1="";
  palabraIncorrecta2="";
  numeros:any[];
  /* Imagenes */
  imagen1="";
  imagen2="";
  imagen3="";
  /* Resposta correcta */
  respostaCorrecta=0;
  constructor(private data: DataService,
    private _router: Router,
    private route: ActivatedRoute, private historial: HistorialService,) { }

  /* Busca imagenes */
  buscaUnsplash(paraula: string){
    this.data.getPhotos(paraula)
     .subscribe(
       (result:any) => {
        if(result["total"]==0){
          this.hayImagenes=false;
       }else{
        let numero= Math.floor(Math.random() * (3 - 1)) + 1;
        let repeat=true;
        while (repeat) {
          switch (numero) {
            case 1:
              if(this.imagen1!=""){
                numero=2;
              }else{
                this.imagen1=result["results"]["0"]["urls"]["regular"];
                repeat=false;
                if(this.respostaCorrecta==0){
                  this.respostaCorrecta=1;
                }
              }
              break;
            case 2:
              if(this.imagen2!=""){
                numero=3;
              }else{
                this.imagen2=result["results"]["3"]["urls"]["regular"];
                repeat=false;
                if(this.respostaCorrecta==0){
                  this.respostaCorrecta=2;
                }
              }
              break;
            case 3:
              if(this.imagen3!=""){
                numero=1;
              }else{
                this.imagen3=result["results"]["0"]["urls"]["regular"];
                repeat=false;
                if(this.respostaCorrecta==0){
                  this.respostaCorrecta=3;
                }
              }
              break;
          }
        }
      }
       },
       (error) => {
        console.log(error);
       }
     );
   }

/* Comprueba si la que se pico es correcta */
checkCorrecta(numero){
  let imagenSeleccionada=document.getElementById(numero)
  if(imagenSeleccionada.style.borderStyle=="solid"){
    imagenSeleccionada.style.borderStyle="none";
    imagenSeleccionada.style.borderRadius="0px";
  }else{
    if(numero==this.respostaCorrecta){
      imagenSeleccionada.style.borderColor="#5BCA38";
      imagenSeleccionada.style.borderStyle="solid";
      imagenSeleccionada.style.borderWidth="4px";
      imagenSeleccionada.style.borderRadius="15px";
    }else{
      imagenSeleccionada.style.borderColor="#b91e15";
      imagenSeleccionada.style.borderStyle="solid";
      imagenSeleccionada.style.borderWidth="4px";
      imagenSeleccionada.style.borderRadius="15px";
    }
  }
}

getUltimas(){
  this.historial.getUltimas()
     .subscribe(
       (result:any) => {
        if(result["total"]!=0){
          console.log(result);
          this.palabraIncorrecta1=result["0"];
          this.palabraIncorrecta2=result["3"];
          this.buscaUnsplash(this.palabraIncorrecta1);
          this.buscaUnsplash(this.palabraIncorrecta2);
        }
       },
       (error) => {
        console.log(error);
       }
     );
   }

/* Aquesta funció recull la paraula que s'ha passat i la tradueix al anglés amb l'ajuda dela api de jisho */
traducirIngles(paraula){
  this.palabraPrincipal=this.search;
  this.data.getMeaning(paraula)
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
      console.log("hh");
      this.traducirIngles(this.search);
      this.getUltimas();
      
    });
  }

}
