import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosPalabra } from '../models/datos-palabra.model';
import { Log } from '../models/log.model';
import { HistorialService } from '../historial.service';
declare const YG: any;
@Component({
  selector: 'app-resultado-busqueda',
  templateUrl: './resultado-busqueda.component.html',
  styleUrls: ['./resultado-busqueda.component.css']
})
export class ResultadoBusquedaComponent implements OnInit {
  search:string="";
  subscription!: Subscription;
  cargando=true;
  mostrarNHK=true;
  mostrarImagenes=true;
  cosesquequeden=5;
  encontrada=false;
  /* Info palabra */
  palabraPrincipal="";
  lectura="";
  traduccionIngles="";
  traduccionEspanol="";
  jlpt="N0";
  

  /* Imagenes */
  imagen1="";
  imagen2="";
  imagen3="";
  contador=1;
  imagenMovil=""
  /* NHK */
  fraseNHKtitle=""
  fraseNHKlink="";

  /* Yahoo */
  fraseYahootitle=""
  fraseYahoolink="";

  PalabraInfo= new DatosPalabra;
  Log= new Log();
  DatosPalabra= new DatosPalabra();

  constructor(private data: DataService, private historial: HistorialService,
    private _router: Router,
    private route: ActivatedRoute) { }

    /* Registrar busqueda */
  registrarBusqueda(){
      this.historial.insertLog(this.Log)
      .subscribe(
        (result:any) => {
        console.log("exito");
        },
        (error) => {
        console.log(error);
        }
      );
  }

    /* Busca imagenes */
  buscaUnsplash(paraula: string){
    this.data.getPhotos(paraula)
     .subscribe(
       (result:any) => {
         console.log(result["total"]);
         if(result["total"]==0){
            this.mostrarImagenes=false;
         }else{
          this.imagen1=result["results"]["0"]["urls"]["regular"];
          this.imagen2=result["results"]["1"]["urls"]["regular"];
          this.imagen3=result["results"]["2"]["urls"]["regular"];
        
          this.imagenMovil=this.imagen1;
          console.log("Imagen movil:"+this.imagenMovil);
          console.log("Imagen 1:"+this.imagen1);
        }
         this.cosesquequeden--;
         if(this.cosesquequeden==0 && this.encontrada==false){
           this.registrarPalabra();
         }
       },
       (error) => {
        console.log(error);
       }
     );
   }

   /* Controla el tamany de les paraules en angles */
  tamanyoPalabrasIngles(paraula: string){
    let letrasIngles=paraula.split('');
    console.log("Traduccion ingles: " +paraula);
    let h2palabra=document.getElementById("traduccionIngles");
    console.log("Letras ingles: " +letrasIngles.length);
    if(letrasIngles.length==9){
      h2palabra?.setAttribute("style", "font-size: 30px;");
    }else if(letrasIngles.length==10){
      h2palabra?.setAttribute("style", "font-size: 29px;");
    }else if(letrasIngles.length==11){
      h2palabra?.setAttribute("style", "font-size: 25px;");
    }else if(letrasIngles.length==12){
      h2palabra?.setAttribute("style", "font-size: 25px;");
    }else{
      h2palabra?.setAttribute("style", "font-size: 32px;");
    }
  }

   /* Controla el tamany de les paraules en castella */
   tamanyoPalabrasEspanol(paraula: string){
    let letrasEspanol=paraula.split('');
    console.log("Traduccion Español: " +paraula);
    let h2palabra=document.getElementById("traduccionEspanol");
    console.log("Letras Español: " +letrasEspanol.length);

    if(letrasEspanol.length==9){
      h2palabra?.setAttribute("style", "font-size: 30px;");
    }else if(letrasEspanol.length==10){
      h2palabra?.setAttribute("style", "font-size: 29px;");
    }else if(letrasEspanol.length==11){
      h2palabra?.setAttribute("style", "font-size: 25px;");
    }else if(letrasEspanol.length==12){
      h2palabra?.setAttribute("style", "font-size: 25px;");
    }else{
      h2palabra?.setAttribute("style", "font-size: 32px;");
    }
  }

  /* Aquesta funció recull la paraula que s'ha passat i la tradueix al anglés amb l'ajuda dela api de jisho */
  traducirIngles(){
    this.palabraPrincipal=this.search;
    this.data.getMeaning(this.palabraPrincipal)
    .subscribe(
      (result:any) => {
        console.log(result);
        this.lectura=result["0"]["japanese"]["0"]["reading"];
        this.traduccionIngles=result["0"]["senses"]["0"]["english_definitions"]["0"].toUpperCase();
        //Calcula quin nivell del JLPT correspon
        switch(result["0"]["jlpt"]["0"]){
          case "jlpt-n5":
            this.jlpt="N5";
            break;
          case "jlpt-n4":
            this.jlpt="N4";
            break;
          case "jlpt-n3":
            this.jlpt="N3";
              break;
          case "jlpt-n2":
            this.jlpt="N2";
              break;
          case "jlpt-n1":
            this.jlpt="N1";
              break;
          default:
              break;
        }
        this.cosesquequeden--;
         if(this.cosesquequeden==0 && this.encontrada==false){
           this.registrarPalabra();
         }
        //Busca imatges
        this.buscaUnsplash(this.traduccionIngles);
        //Cambia tamaño
        this.tamanyoPalabrasIngles(this.traduccionIngles);
      },
      (error) => {
       console.log(error);
      }
    );
  }

  /* Aquest funcio fa una busqueda al traductor de google i consegueix la traduccio al castella */
  traducirEspanol(){
    this.palabraPrincipal=this.search;
    this.data.getSpanish(this.palabraPrincipal)
    .subscribe(
      (result:any) => {
        this.traduccionEspanol=result.toUpperCase();
        this.tamanyoPalabrasEspanol(this.traduccionEspanol);
        this.cosesquequeden--;
         if(this.cosesquequeden==0 && this.encontrada==false){
           this.registrarPalabra();
         }
      },
      (error) => {
       console.log(error);
      }
    );
  }

  /* Funcion para comprobar si tiene letras una palabra */
  tieneLetras(){
    var letrasMinusculas="abcdefghyjklmnñopqrstuvwxyz";
    var letrasMayusculas=letrasMinusculas.toUpperCase();
    var letras= letrasMinusculas+letrasMayusculas+".-?¿`+´ç1234567890,;:_¨Ç*^'¡!·$%&/()=ªº\|@#¢∞¬÷“”≠´‚[]}{–…„";
    var arrayPalabra=this.search.split("");
    console.log(arrayPalabra);
    var arrayLetras=letras.split("");
    console.log(arrayLetras);
    for (let i = 0; i < arrayPalabra.length; i++) {
      for (let j = 0; j < arrayLetras.length; j++) {
        if(arrayPalabra[i]==arrayLetras[j]){
          this._router.navigate(['/', 'error']);
        } 
      }
    }
    if(this.search==""){
      this._router.navigate(['/', 'error']);
    }
   }

  /* Funcio que fa que recarregui la pagina amb la nova paraula que s'ha buscat passant la paraula buscada per la ruta */
  buscar(){
    this._router.navigate(['search/', this.search]);
    
    //Reinicia les variables
    this.mostrarNHK=true;
    this.cargando=true;
    this.mostrarImagenes=true;
    
  }

  /* Funcio que posa play al audio que s'indica */
  playAudio(){
    let audio = new Audio();
    let link= "../../../assets/audio/"+this.palabraPrincipal+"【"+this.lectura+"】.mp3";
    audio.src = link;
    audio.load();
    audio.play();
  }

  /* Funcion que se mira todo lo recibido y decide que frases va a mostrar (Solo 1 o ninguna) */
  decideQueFraseMostrar(frases:Array<any>){
    let ambParaula=frases.filter(frase=> {
      return(frase.text.includes(this.search));
    })
    if(ambParaula.length>0){
      return ambParaula[0].text;
    }else{
      return null;
    }
   }

   /* Funcion que se mira todo lo recibido y decide que frases va a mostrar (Solo 1 o ninguna) */
   decideLinkQueMostrar(frases:Array<any>){
    let ambParaula=frases.filter(frase=> {
      return(frase.text.includes(this.search));
    })
    if(ambParaula.length>0){
      return ambParaula[0].link;
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
        if(this.fraseNHKtitle!=null){
          this.fraseNHKlink=this.decideLinkQueMostrar(result);
        }else{
          this.mostrarNHK=false;
          console.log("no hi ha nhk")
        }
        this.cosesquequeden--;
         if(this.cosesquequeden==0 && this.encontrada==false){
           this.registrarPalabra();
         }
      },
      (error) => {
       console.log(error);
      }
    );
  }

  /* Se conecta a la api que consigue frases de la web Yahoo de noticias y devuelve frases */
  buscaExemplesYahoo(){
    this.palabraPrincipal=this.search;
    this.data.getFrasesYahoo(this.palabraPrincipal)
    .subscribe(
      (result:any) => {
        console.log(result);
        this.fraseYahootitle=this.decideQueFraseMostrar(result);
        this.fraseYahoolink=this.decideLinkQueMostrar(result);
        this.cosesquequeden--;
        if(this.cosesquequeden==0 && this.encontrada==false){
          this.registrarPalabra();
        }
      },
      (error) => {
       console.log(error);
      }
    );
  }
  /* Controla el tamany de les paraules en japones */
  tamanyoPalabrasJapones(){
    let arrayCarateres=this.search.split('');
    console.log("Caracteres japones: "+arrayCarateres.length);
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
  }

  /* Buscador de videos con un widget */
  onYouglishAPIReady() {
    this.palabraPrincipal=this.search;
    let youglish_widget = new YG.Widget("youglish_widget", {
      width: 640,
      components: 64, //Segons el numero es veu el buscador i les captions o no
      events: {
        'onFetchDone': function (e:any) {
          if (e.totalResult === 0) alert("No result found");
          else totalTracks = e.totalResult;
        },
        'onVideoChange': function (e:any) {
          curTrack = e.trackNumber;    views = 0;
        },
        'onCaptionConsumed': function (e:any) {
          if (++views < 3) { youglish_widget.replay();     }
          else {
            if (curTrack < totalTracks){  youglish_widget.next(); }
          }
        }
      }
    });
    // 4. process the query
    youglish_widget.fetch(this.palabraPrincipal, "japanese");　//Aqui es donde pongo que se busque la palabra que estemos buscando
    let views = 0, curTrack = 0, totalTracks = 0;
  }

  /* Funcion para que si busca palabras que no existen se vaya a la pagina de error */
  buscaError(){
    this._router.navigate(['error']);
  }

  /* Guarda los datos necesarios para guardar la busqueda de la palabra */
  guardarFechayPalabra(){
    this.Log.word=this.search;
    let d= new Date();
    let year= d.getFullYear();
    let month=d.getMonth()+1;
    let day=d.getDate();
    let hour=d.getHours();
    let minute=d.getMinutes();
    let second=d.getSeconds();
    let date=year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
    this.Log.search_date=date;
    console.log(this.Log);
  }

  /* Resgistra la palabra en la bbdd */
  registrarPalabra(){
    this.guardarDatos();
    this.historial.insertPalabra(this.PalabraInfo)
       .subscribe(
         (result:any) => {
         console.log("palabra registrada");
         },
         (error) => {
         console.log(error);
         }
       );
  }

  /* Busca si esta guradada la palabra en el diccionario de la bbdd para ofrecer la info más rapido */
  buscarEnDiccionario(){
    this.historial.getWord(this.palabraPrincipal)
    .subscribe(
      (result:any) => {
      if(result==null){
        console.log("no encontrada");
      }else{
        console.log("encontrada");
        this.encontrada=true;
      }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /* Guarda los datos en una palabra llamada datos palabra para registrarlo en la bbdd del diccionario */
  guardarDatos(){
    this.PalabraInfo.word=this.palabraPrincipal;
    this.PalabraInfo.example1=this.fraseNHKtitle;
    this.PalabraInfo.example1link=this.fraseNHKlink;
    this.PalabraInfo.example2link=this.fraseYahootitle;
    this.PalabraInfo.example2link=this.fraseYahoolink;
    this.PalabraInfo.image1=this.imagen1;
    this.PalabraInfo.image2=this.imagen2;
    this.PalabraInfo.image3=this.imagen3;
    this.PalabraInfo.english=this.traduccionIngles;
    this.PalabraInfo.spanish=this.traduccionEspanol;
  }

  /* Cambia la imatge que es mostra en responsive */
  cambiarImagenDerecha(){
    switch (this.contador) {
      case 1:
        this.imagenMovil=this.imagen2;
        this.contador++;
      break;
      case 2:
        this.imagenMovil=this.imagen3;
        this.contador++;
      break;
      case 3:
        this.imagenMovil=this.imagen1;
        this.contador=1; 
      break;
    }
   
  }

   /* Cambia la imatge que es mostra en responsive */
   cambiarImagenIzquierda(){
    switch (this.contador) {
      case 1:
        this.imagenMovil=this.imagen3;
        this.contador++;
      break;
      case 2:
        this.imagenMovil=this.imagen1;
        this.contador++;
      break;
      case 3:
        this.imagenMovil=this.imagen2;
        this.contador=1; 
      break;
    }
   
  }


  ngOnInit() {
    /* Aqui s'agafa la paraula que se li passar i l'associa a la variable busqueda */
    this.route.params.subscribe(params => {
    setTimeout(() => {
      this.cargando=false;
    }, 16000);
      this.search = params['word'];
      this.tieneLetras();
      /* Guarda la busqueda */
      this.guardarFechayPalabra();
      this.registrarBusqueda(); 
      /* Tradueix al angles i busca imatges*/
      this.traducirIngles();
      /* Canvis al CSS */
      this.tamanyoPalabrasJapones();
      /* Traduir al castella */
      this.traducirEspanol();
      /* Busqueda d'exemples */
      this.buscaExemplesNHK();  
      this.buscaExemplesYahoo();
      /* Busqueda de videos de youtube */
      this.onYouglishAPIReady();
      /* Busca en el diccionario */
      this.buscarEnDiccionario();
    });
  }


}
