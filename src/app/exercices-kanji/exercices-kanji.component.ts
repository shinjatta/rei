import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-exercices-kanji',
  templateUrl: './exercices-kanji.component.html',
  styleUrls: ['./exercices-kanji.component.css']
})
export class ExercicesKanjiComponent implements OnInit {
  search:string="";
  palabraPrincipal="";
  answer="";
  lectura="";
  tieneKanji=true;
  constructor(private _router: Router,
    private route: ActivatedRoute, private data: DataService,) { }

  buscar(){
    this._router.navigate(['search/', this.search]);
  }
  /* Consigue la lectura de la palabra es decir la respuesta correcta */
  conseguirLectura(){
    this.palabraPrincipal=this.search;
    this.data.getMeaning(this.palabraPrincipal)
    .subscribe(
      (result:any) => {
        this.lectura=result["0"]["japanese"]["0"]["reading"];
        console.log(this.lectura);
      },
      (error) => {
       console.log(error);
      }
    );
  }
  /* Funcion para comprobar si tiene letras una palabra */
  tiene_letras(){
  var letrasMinusculas="abcdefghyjklmnñopqrstuvwxyz";
  var letrasMayusculas=letrasMinusculas.toUpperCase();
  var letras= letrasMinusculas+letrasMayusculas;
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
  /* Comprobar si te kanji o no */
  tiene_tieneKanji(){
    var arrayPalabra=this.search.split("");
    console.log(arrayPalabra);
    var kana=['あ', 'い', 'う', 'え', 'お',
    'か', 'き', 'く', 'け', 'こ',
    'さ', 'し', 'す', 'せ', 'そ',
    'た', 'ち', 'つ', 'て', 'と',
    'な', 'に', 'ぬ', 'ね', 'の',
    'は', 'ひ', 'ふ', 'へ', 'ほ',
    'ま', 'み', 'む', 'め', 'も',
    'や',      'ゆ',      'よ',
    'ら', 'り', 'る', 'れ', 'ろ',
    'わ', 'ゐ',      'ゑ', 'を',
                        'ん',
    'が', 'ぎ', 'ぐ', 'げ', 'ご',
    'ざ', 'じ', 'ず', 'ぜ', 'ぞ',
    'だ', 'ぢ', 'づ', 'で', 'ど',
    'ば', 'び', 'ぶ', 'べ', 'ぼ',
    'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ',

    'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ',
    'ア', 'イ', 'ウ', 'エ', 'オ', 
    'カ', 'キ', 'ク', 'ケ', 'コ', 
    'サ', 'シ', 'ス', 'セ', 'ソ', 
    'タ', 'チ', 'ツ', 'テ', 'ト', 
    'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 
    'ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 
    'マ', 'ミ', 'ム', 'メ', 'モ', 
    'ヤ',      'ユ',      'ヨ', 
    'ラ', 'リ', 'ル', 'レ', 'ロ', 
    'ワ', 'ヰ',      'ヱ', 'ヲ', 
                        'ン',
    'ガ', 'ギ', 'グ', 'ゲ', 'ゴ', 
    'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ', 
    'ダ', 'ヂ', 'ヅ', 'デ', 'ド', 
    'バ', 'ビ', 'ブ', 'ベ', 'ボ', 
    'パ', 'ピ', 'プ', 'ペ', 'ポ', 

    'ァ', 'ィ', 'ゥ', 'ェ', 'ォ', 
    'ー',];
    let numerodeKana=0;
    for (let i = 0; i < arrayPalabra.length; i++) {
      for (let j = 0; j < kana.length; j++) {
        if(arrayPalabra[i]==kana[j]){
          numerodeKana++;
        } 
      }
    }
    if(numerodeKana==arrayPalabra.length){
      this.tieneKanji=false;
    }
   }

  /* Comprueba si esta bien o no la lectura introducida */
  checkSiEstaBien(){
    if(this.answer==this.lectura){
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
      this.tiene_letras();
      this.tiene_tieneKanji();
      this.palabraPrincipal=this.search;
      this.conseguirLectura();
    });
  }

}
