import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { VolService } from '../services/vol.service';
import { AvionService } from '../services/avion.service';
import { Avion } from '../model/avion';
import { PiloteService } from '../services/pilote.service';
import { Pilote } from '../model/pilote';

@Component({
  selector: 'app-vol',
  templateUrl: './vol.component.html',
  styleUrls: ['./vol.component.css']
})
export class VolComponent implements OnInit {

  private nbPara: number = null;
  private numAvion: number = 0;
  public avion: Avion;
  public pageVol: string = "avions";
  public first: boolean = true;
  public popup: boolean = false;
  public pilotes: Array<Pilote> = [];

  constructor(public appComp : AppComponent, public srvVol: VolService,
    public srvAvion: AvionService,
    public srvPilote: PiloteService) {}

  ngOnInit(): void {
    this.srvVol.reload();
    this.srvAvion.reloadAvionDispo();
    this.srvPilote.reload();
  }
  
  public pilotesFiltered() {
    this.srvPilote.pilotes.forEach(p => {
      console.log(p.avions);
      p.avions.forEach(a => {
        if (a.id == this.avion){
          this.pilotes.push(p);
        }
      })
    })
    console.log(this.pilotes);
  }

  public test(){
    this.srvVol.nbSauts = [];
    this.srvVol.vols.forEach(v => this.getNbSauts(v.id));
  }

  public test2(){
    console.log("srv:" + this.srvVol.nbSauts);
  }

  public getNbSauts(id){
    this.srvVol.reloadCount(id);
    return this.srvVol.nbSaut;
  }

  public changeAvion(n){
    this.first = false;
    this.numAvion += n;
    if (this.numAvion < 0){
      this.numAvion = this.srvAvion.avions.length - 1;
    }
    if (this.numAvion > this.srvAvion.avions.length - 1){
      this.numAvion = 0;
    }
    this.avion = this.srvAvion.avions[this.numAvion];
    document.getElementById("nomAvion").innerHTML = "[ " + String(this.avion.nom).toLocaleUpperCase() + " ]";
    if (this.avion.etat){
      document.getElementById("avionLogo").style.setProperty("-webkit-filter", "drop-shadow(0 0 0.2rem #00b000)");
    } else {
      document.getElementById("avionLogo").style.setProperty("-webkit-filter", "drop-shadow(0 0 0.2rem #b00000)");
    }
  }

  public changePage(page){
    this.pageVol = page;
    this.avion = this.srvAvion.avions[this.numAvion];

    if (page == "saut"){
      this.srvVol.getVolByAvion(this.avion.id);
    }
  }

  public modif(membre){

  }
}
