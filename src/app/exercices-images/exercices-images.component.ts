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
  imagenIncorrecta1="";
  imagenIncorrecta2="";
  imagenCorrecta="";
  numeros:any[];
  cosesQueQueden=1;
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
         this.imagenCorrecta=result["results"]["0"]["urls"]["regular"];
         
         if(this.cosesQueQueden==0){
           this.ponerAleatorio();
         }else{
          this.cosesQueQueden--;
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
  let imagenSeleccionada=document.getElementById(numero);
  switch (numero) {
    case 1:
      /* Si picas la imagen y ya tiene borde lo quita */
      if(imagenSeleccionada.style.borderStyle=="solid"){
        imagenSeleccionada.style.borderStyle="none";
        imagenSeleccionada.style.borderRadius="0px";
      }else{
        /* Cambia el margen de la imagen seleccionada */
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
      /* Quita los margenes de las otras */
      let otraImagen11=document.getElementById("2");
      let otraImagen21=document.getElementById("3");
      if(otraImagen11.style.borderStyle=="solid"){
        otraImagen11.style.borderStyle="none";
        otraImagen11.style.borderRadius="0px";
      }
      if(otraImagen21.style.borderStyle=="solid"){
        otraImagen21.style.borderStyle="none";
        otraImagen21.style.borderRadius="0px";
      }
      
    break;
    case 2:
      /* Si picas la imagen y ya tiene borde lo quita */
      if(imagenSeleccionada.style.borderStyle=="solid"){
        imagenSeleccionada.style.borderStyle="none";
        imagenSeleccionada.style.borderRadius="0px";
      }else{
        /* Cambia el margen de la imagen seleccionada */
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
      /* Quita los margenes de las otras */
      let otraImagen12=document.getElementById("1");
      let otraImagen22=document.getElementById("3");
      if(otraImagen12.style.borderStyle=="solid"){
        otraImagen12.style.borderStyle="none";
        otraImagen12.style.borderRadius="0px";
      }
      if(otraImagen22.style.borderStyle=="solid"){
        otraImagen22.style.borderStyle="none";
        otraImagen22.style.borderRadius="0px";
      }
    break;
    case 3:
      /* Si picas la imagen y ya tiene borde lo quita */
      if(imagenSeleccionada.style.borderStyle=="solid"){
        imagenSeleccionada.style.borderStyle="none";
        imagenSeleccionada.style.borderRadius="0px";
      }else{
        /* Cambia el margen de la imagen seleccionada */
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
      /* Quita los margenes de las otras */
      let otraImagen13=document.getElementById("1");
      let otraImagen23=document.getElementById("2");
      if(otraImagen13.style.borderStyle=="solid"){
        otraImagen13.style.borderStyle="none";
        otraImagen13.style.borderRadius="0px";
      }
      if(otraImagen23.style.borderStyle=="solid"){
        otraImagen23.style.borderStyle="none";
        otraImagen23.style.borderRadius="0px";
      }
    break;
  }
}

getUltimas(){
  this.historial.getUltimas()
     .subscribe(
       (result:any) => {
        if(result["total"]!=0){
          console.log(result);
          this.imagenIncorrecta1=result["0"]["image2"];
          this.imagenIncorrecta2=result["3"]["image1"];
          console.log("Dentro get Ultimas "+this.imagenIncorrecta1);
          if(this.cosesQueQueden==0){
            this.ponerAleatorio();
          }else{
           this.cosesQueQueden--;
          }
        }
       },
       (error) => {
        console.log(error);
       }
     );
   }
/* Ponerlas aleatoriamente */
ponerAleatorio(){
  this.respostaCorrecta= Math.floor(Math.random() * (3 - 1)) + 1;
  switch (this.respostaCorrecta) {
    case 1:
      this.imagen1=this.imagenCorrecta;
      this.imagen2=this.imagenIncorrecta1;
      this.imagen3=this.imagenIncorrecta2;
      break;
    case 2:
      this.imagen1=this.imagenIncorrecta1;
      this.imagen2=this.imagenCorrecta;
      this.imagen3=this.imagenIncorrecta2;
    break;
    case 3:
      this.imagen1=this.imagenIncorrecta1;
      this.imagen2=this.imagenIncorrecta2;
      this.imagen3=this.imagenCorrecta;
    break;  
    default:
      break;
  }
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
      console.log("dentro del on init "+this.imagenIncorrecta1);      
    });
  }

}
