import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  search:string="";
  
  constructor(private _router: Router,
    private route: ActivatedRoute,) { }

  buscar(){
    this._router.navigate(['', this.search]);
  }
  ngOnInit(): void {
  }

}
