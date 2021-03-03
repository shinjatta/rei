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

 /*  JishoApi = require('unofficial-jisho-api');
  jisho = new this.JishoApi();
  proxy = 'https://cors-anywhere.herokuapp.com/'
  url = this.proxy + this.jisho.getUriForPhraseSearch(this.palabraPrincipal);

  response = await fetch(this.url);
  json = await this.response.json(); */
  
/* 
  // Listen on a specific host via the HOST environment variable
  var host = process.env.HOST || '0.0.0.0';
  // Listen on a specific port via the PORT environment variable
  var port = process.env.PORT || 8080;

  var cors_proxy = require('cors-anywhere');
  cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
  }).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
  }); */
  
  constructor(private buscadorComponent: BuscadorComponent, private data: DataService) { }

  ngOnInit(): void {
    /* this.subscription = this.data.currentSearch.subscribe(search => this.palabraPrincipal = search)
    console.log(this.json); */


   /*  this.jisho.searchForPhrase(this.palabraPrincipal).then((result: any) => {
      this.traduccionIngles=result.english;
      console.log(this.traduccionIngles);
    }); */
  }

  
}
