import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpInterceptor, HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private buscadorSource = new BehaviorSubject('ある');
  currentSearch = this.buscadorSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  changeSearch(search: string) {
    this.buscadorSource.next(search)
  }


  private API_JISHO = "https://kanji-cors-bypass.herokuapp.com/api/";

  public getMeaning(paraula:string)
  {
    return this.httpClient.get(
      this.API_JISHO+paraula, { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }
    );
  }

  /* BUSCADOR DE EJEMPLOS */
  /* Nhk: Lloc de noticies */
  private API_NHK = "http://localhost:3000/frases/nhk/";

  public getFrasesNHK(paraula:string)
  {
    return this.httpClient.get(
      this.API_NHK+paraula, { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }
    );
  }

  /* Yahoo: Lloc de noticies */
  private API_Yahoo = "http://localhost:3000/frases/yahoo/";

  public getFrasesYahoo(paraula:string)
  {
    return this.httpClient.get(
      this.API_Yahoo+paraula, { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }
    );
  }
  
  /* Para conseguir traducción al español */
  private API_SPANISH = "http://localhost:3000/traduccion/spanish/";

  public getSpanish(paraula:string)
  {
    return this.httpClient.get(
      this.API_SPANISH+paraula, { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }
    );
  }

  /* Unsplash */
  private API_UNSPLASH = "https://api.unsplash.com/search/photos?query=";
  private CLIENT_ID ="&client_id=BH24Vtg87EprdXU2fIZVJA1mRPwsOzYack5WUgNHLUg";
  public getPhotos(paraula:string)
  {
    return this.httpClient.get(
      this.API_UNSPLASH+paraula+this.CLIENT_ID, { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }
    ); 
  }


}
