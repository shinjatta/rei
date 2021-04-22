import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import * as puppeteer from 'puppeteer';
/* import * as translate from 'node-google-translate-skidz-master'; */
/* import * as translate from 'node-google-translate-skidz'; */
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
  fraseNHKtitle=""
  fraseNHKlink="";

  constructor(private data: DataService, 
    private _router: Router,
    private route: ActivatedRoute,) { }

  /* Aquesta funció recull la paraula que s'ha passat i la tradueix al anglés amb l'ajuda dela api de jisho */
  traducir(){
    this.palabraPrincipal=this.search;
    this.data.getMeaning(this.palabraPrincipal)
    .subscribe(
      (result:any) => {
        this.lectura=result["0"]["japanese"]["0"]["reading"];
        this.traduccionIngles=result["0"]["senses"]["0"]["english_definitions"]["0"].toUpperCase();
      },
      (error) => {
       console.log(error);
      }
    );
  }

  /* Funcio que fa que recarregui la pagina amb la nova paraula que s'ha buscat passant la paraula buscada per la ruta */
  /* S'executa cada vegada que es pica el boto de buscar */
  buscar(){
    this._router.navigate(['', this.search]);
  }

  /* Funcion que se mira todo lo recibido y decide que frases va a mostrar (Solo 1 o ninguna) */
  decideQueFraseMostrar(frases:Array<any>){
    let ambParaula=frases.filter(frase=> {
      return(frase.title.includes(this.search));
    })
    if(ambParaula.length>0){
      return ambParaula[0].title;
    }else{
      return null;
    }
   }

  /* Se conecta a la api que consigue frases de la web nhk de noticias y devuelve frases */
  buscaExemplesNHK(){
    this.palabraPrincipal=this.search;
    this.data.getFrasesNHK(this.palabraPrincipal)
    .subscribe(
      (result:any) => {
        this.fraseNHKtitle=this.decideQueFraseMostrar(result);
        console.log(this.fraseNHKtitle);
      },
      (error) => {
       console.log(error);
      }
    );
  }
  /* Controla el tamany de les paraules  */
  tamanyoPalabras(){
    let arrayCarateres=this.search.split('');
    console.log(arrayCarateres.length);
    let h1palabra=document.getElementById("palabraPrincipal");
    switch(arrayCarateres.length){
      case 1:
        h1palabra?.setAttribute("style", "font-size: 96px;");
        break;
      case 2:
        h1palabra?.setAttribute("style", "font-size: 96px;");
        break;
      case 3:
        h1palabra?.setAttribute("style", "font-size: 78px;");
      break;
      case 4:
        h1palabra?.setAttribute("style", "font-size: 59px;");
      break;
      case 5:
        h1palabra?.setAttribute("style", "font-size: 47px;");
      break;
      default:
        h1palabra?.setAttribute("style", "font-size: 39px;");
    }

    let letrasIngles=this.traduccionIngles.split('');
    console.log(this.traduccionIngles);
    let h2palabra=document.getElementById("traduccionIngles");
    console.log(letrasIngles.length);
    if(letrasIngles.length>=12){
      h2palabra?.setAttribute("style", "font-size: 26px;");
    }else{
      h2palabra?.setAttribute("style", "font-size: 32px;");
    }
  }
  
  ngOnInit() {
    /* Aqui s'agafa la paraula que se li passar i l'associa a la variable busqueda */
    this.route.params.subscribe(params => {
      this.search = params['word'];
      this.traducir();
      this.tamanyoPalabras();
      this.buscaExemplesNHK();
      
    });
   
    /* var translate = require('node-google-translate-skidz'); */

   /*  translate({
      text: this.traduccionIngles,
      source: 'en',
      target: 'es'
    }, function(result: any) {
      console.log(result);
    });  */
  }


}
