import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private buscadorSource = new BehaviorSubject('継承');
  currentSearch = this.buscadorSource.asObservable();

  constructor() { }

  changeSearch(search: string) {
    this.buscadorSource.next(search)
  }
}
