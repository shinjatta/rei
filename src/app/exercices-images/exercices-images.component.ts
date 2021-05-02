import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exercices-images',
  templateUrl: './exercices-images.component.html',
  styleUrls: ['./exercices-images.component.css']
})
export class ExercicesImagesComponent implements OnInit {
  search:string="";
  
  constructor(private _router: Router,
    private route: ActivatedRoute,) { }

  buscar(){
    this._router.navigate(['search/', this.search]);
  }

  ngOnInit(): void {
  }

}
