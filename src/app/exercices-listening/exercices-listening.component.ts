import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare const YG: any;
@Component({
  selector: 'app-exercices-listening',
  templateUrl: './exercices-listening.component.html',
  styleUrls: ['./exercices-listening.component.css']
})
export class ExercicesListeningComponent implements OnInit {
  palabraPrincipal="";
  search:string="";
  answer:string="";
  
  constructor(private _router: Router,
    private route: ActivatedRoute,) { }

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

  buscar(){
    this._router.navigate(['search/', this.search]);
  }

   /* Comprueba si esta bien o no la lectura introducida */
   checkSiEstaBien(){
    if(this.answer.includes(this.palabraPrincipal)){
      document.getElementById("correcto").style.display="inherit";
      document.getElementById("incorrecto").style.display="none";

    }else{
      document.getElementById("incorrecto").style.display="inherit";
      document.getElementById("correcto").style.display="none";
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.search = params['word'];
      this.palabraPrincipal=this.search;
      this.onYouglishAPIReady();
    });
  }    

}
