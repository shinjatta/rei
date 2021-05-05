import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exercices-kanji',
  templateUrl: './exercices-kanji.component.html',
  styleUrls: ['./exercices-kanji.component.css']
})
export class ExercicesKanjiComponent implements OnInit {
  search:string="";
  palabraPrincipal="";
  answer="";
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
