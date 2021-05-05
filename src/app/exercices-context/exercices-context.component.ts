import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exercices-context',
  templateUrl: './exercices-context.component.html',
  styleUrls: ['./exercices-context.component.css']
})
export class ExercicesContextComponent implements OnInit {
  search:string="";
  palabraPrincipal="";
  constructor(private _router: Router,
    private route: ActivatedRoute,) { }

  buscar(){
    this._router.navigate(['search/', this.search]);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.search = params['word'];
      this.palabraPrincipal=this.search;
    });
  }

}
