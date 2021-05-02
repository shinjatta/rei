import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exercices-listening',
  templateUrl: './exercices-listening.component.html',
  styleUrls: ['./exercices-listening.component.css']
})
export class ExercicesListeningComponent implements OnInit {

  search:string="";
  
  constructor(private _router: Router,
    private route: ActivatedRoute,) { }

  buscar(){
    this._router.navigate(['search/', this.search]);
  }

  ngOnInit(): void {
  }

}
