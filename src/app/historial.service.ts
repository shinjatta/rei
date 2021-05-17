import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DatosPalabra } from './models/datos-palabra.model';
import { Log } from './models/log.model';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  constructor(private httpClient: HttpClient) { }

  /* =====  GETS ===== */
  //Get one word
  //Si es null i tal l'envio a crear
  private API_WORD = "http://localhost:3000/diccionari/";

  public getWord(paraula:string)
  {
    return this.httpClient.get(
      this.API_WORD+paraula, { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }
    );
  }
  //Get ranking
  private API_RANKING = "http://localhost:3000/ranking/";

  public getRanking()
  {
    return this.httpClient.get(
      this.API_RANKING, { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }
    );
  }

  //Get ultimas buscadas (per als exercis)
  private API_ULTIMAS = "http://localhost:3000/ultimas/";

  public getUltimas()
  {
    return this.httpClient.get(
      this.API_ULTIMAS, { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }
    );
  }

  /* ===== UPDATES ===== */
  //Insert new word
  private API_ADDWORD = "http://localhost:3000/diccionari/add";

  public insertPalabra(word: DatosPalabra): Observable<any> {
    return this.httpClient.post<any>(this.API_ADDWORD, word, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
  }

  //Insert new log
  private API_ADDLOG = "http://localhost:3000/historial/add";

  public insertLog(log: Log): Observable<any> {
    return this.httpClient.post<any>(this.API_ADDLOG, log, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
  }


}
