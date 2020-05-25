import { Component, OnInit } from '@angular/core';
import { Membre } from '../model/membre';
import { Vol } from '../model/vol';
import { Avion } from '../model/avion';
import { Pilote } from '../model/pilote';
import { Saut } from '../model/saut';

@Component({
  selector: 'app-portail',
  templateUrl: './portail.component.html',
  styleUrls: ['./portail.component.css']
})
export class PortailComponent implements OnInit {

  public membre1 = new Membre(1, "Abid", "Jordan");
  public membre2 = new Membre(1, "Gg", "Jerem");
  public sauteurs1 = [this.membre1];
  public avion1 = new Avion(1,"LeCoucou",10,true,2);
  public pilote1 = new Pilote(1,"Pedro","Fernandez");
  public saut1 = new Saut(1,4000,this.sauteurs1,"solo");
  public sauts = [this.saut1];
  public vol1 = new Vol(1,this.avion1,this.pilote1,this.sauts,"attente",this.membre1,this.membre2,4000);
  public vol2 = new Vol(2,this.avion1,this.pilote1,this.sauts,"attente",this.membre2,this.membre1,6000);
  public vols = [this.vol1,this.vol2];

  constructor() { }

  ngOnInit(): void {
  }




}
