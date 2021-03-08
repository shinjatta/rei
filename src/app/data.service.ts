import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpInterceptor, HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private buscadorSource = new BehaviorSubject('継承');
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
}
