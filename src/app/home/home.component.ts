import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistorialService } from '../historial.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  search:string="";
  ranking=[];
  constructor(private _router: Router,
    private route: ActivatedRoute,　private historial: HistorialService,) { }

  buscar(){
    this._router.navigate(['search/', this.search]);
  }

  getRanking(){
    this.historial.getRanking()
    .subscribe(
      (result:any) => {
        this.ranking = result;
        console.log(this.ranking);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  ngOnInit(): void {
    this.getRanking();
  }

}
