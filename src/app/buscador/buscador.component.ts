import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  search:string="";
  subscription!: Subscription;

  constructor(private data: DataService) { }

  buscar(){
   this.data.changeSearch(this.search);
  }
  
  ngOnInit() {
    this.subscription = this.data.currentSearch.subscribe(search => this.search = search)
  }

  
}
