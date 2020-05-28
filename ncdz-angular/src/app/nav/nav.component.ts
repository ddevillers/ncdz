import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvionService } from '../services/avion.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public page: string = "vol";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  change(page){
    document.getElementById(this.page).classList.remove("active-nav");
    this.page = page;
    document.getElementById(page).classList.add("active-nav");
  }

  deco(){
    this.router.navigate([ '/accueil' ]);
  }

}
