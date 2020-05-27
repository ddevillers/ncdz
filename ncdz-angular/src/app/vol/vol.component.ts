import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { VolService } from '../services/vol.service';
import { AvionService } from '../services/avion.service';
import { Avion } from '../model/avion';

@Component({
  selector: 'app-vol',
  templateUrl: './vol.component.html',
  styleUrls: ['./vol.component.css']
})
export class VolComponent implements OnInit {

  private nbPara: number = null;
  private avion: number = 0;

  constructor(public appComp : AppComponent, public srvVol: VolService,
    public srvAvion: AvionService) {}

  ngOnInit(): void {
    this.srvVol.reload();
    this.srvAvion.reloadAvionDispo();
  }

  public volsFiltered() {
    // if (this.filterPrix || this.filterPrix === 0) {
    //  return this.srvVisite.visites.filter(v =>
    //     v.prix == this.filterPrix || v.id == this.filterPrix
    //   );
    // }

    return this.srvVol.vols;
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
    this.avion += n;
    if (this.avion < 0){
      this.avion = this.srvAvion.avions.length - 1;
    }
    if (this.avion > this.srvAvion.avions.length - 1){
      this.avion = 0;
    }
    document.getElementById("nomAvion").innerHTML = "[ " + String(this.srvAvion.avions[this.avion].nom) + " ]";
  }
}
