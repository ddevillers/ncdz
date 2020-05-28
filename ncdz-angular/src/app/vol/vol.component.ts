import { Component, OnInit, HostListener } from '@angular/core';
import { AppComponent } from '../app.component';
import { VolService } from '../services/vol.service';
import { AvionService } from '../services/avion.service';
import { Avion } from '../model/avion';
import { PiloteService } from '../services/pilote.service';
import { Pilote } from '../model/pilote';
import { MembreService } from '../services/membre.service';
import { Membre } from '../model/membre';
import { Vol } from '../model/vol';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vol',
  templateUrl: './vol.component.html',
  styleUrls: ['./vol.component.css']
})
export class VolComponent implements OnInit {

  private numAvion: number = 0;
  public avion: Avion;
  public pageVol: string = "menu";
  public first: boolean = true;
  public popup: boolean = false;
  public popupMembre: string = "";
  public pilotes: Array<Pilote> = [];
  public membres: Array<Membre> = [];
  public vols: Array<Vol> = [];
  public vol: Vol;

  constructor(private router: Router, public appComp : AppComponent, public srvVol: VolService,
    public srvAvion: AvionService,
    public srvPilote: PiloteService,
    public srvMembre: MembreService) {}

  ngOnInit(): void {
    this.srvPilote.reload();
    this.srvMembre.reload();
    this.srvVol.reload();
    this.srvAvion.reloadAvionDispo();
  }
  
  @HostListener('click', ['$event']) onClick(e) {
    if (this.pageVol == "saut"){
      if (e.target.id.includes("H")){
        this.srvVol.vol.hauteurSautMax = e.target.id;
      }
    }
  }

  public volsFiltered(){
    this.srvVol.vols.forEach(v => {
      if (v.etatVol != 'TERMINE' && v.etatVol != 'INCIDENT'){
        this.vols.push(v);
      }
    });
  }

  public pilotesFiltered() {
    this.srvPilote.pilotes.forEach(p => {
      p.avions.forEach(a => {
        if (a.id == this.avion.id){
          this.pilotes.push(p);
        }
      });
    });
  }

  public membresFiltered() {
    if (this.popupMembre == "managerVol"){
      var nLicence = this.srvVol.vol.respoSol.numeroLicence;
    } else {
      var nLicence = this.srvVol.vol.respoVol.numeroLicence;
    }
    this.srvMembre.membres.forEach(m => {
      if ((m.niveau == "INSTRUCTEUR") && (m.numeroLicence != nLicence)){
        this.membres.push(m);
      }
    });
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
    this.srvVol.getVolByAvion(this.avion.id);
  }

  public changePage(page){
    this.pageVol = page;
    this.avion = this.srvAvion.avions[this.numAvion];

    if (page == "avions"){
      this.srvVol.getVolByAvion(this.avion.id);
    }
    if (page == "volTerminating"){
      this.volsFiltered();
    }
  }

  public modif(membre){
    this.popupMembre = membre;
    if (membre == "pilote"){
      this.pilotes = [];
      this.pilotesFiltered();
      this.popup = true;
    } else {
      this.membres = [];
      this.membresFiltered();
      this.popup = true;
    }
  }

  public hide(event){
    if (event.srcElement.id == "popup"){
      this.popup = false;
    }
  }

  public hideChange(){
    this.popup = false;
  }

  public return(){
    if (this.pageVol == "avions" || this.pageVol == "volTerminating"){
      this.vol = null;
      this.vols = [];
      this.ngOnInit();
      this.pageVol = 'menu';
    } else if (this.pageVol == "saut"){
      this.pageVol = 'avions';
      this.numAvion = 0;
      this.first = true;
    }
  }

  public selectedVol(vol){
    this.vol = vol;
    console.log(this.vol);
  }

  public changeEtatVol(etat){
    if (etat){
      if (this.vol.etatVol == "VOL"){
        this.vol.etatVol = "TERMINE";
        this.srvVol.update(this.vol);
        this.vol.avion.enVol = false;
        this.srvAvion.update(this.vol.avion);
        this.router.navigate([ '/cloture' ]);
      } else {
        if (this.vol.etatVol == "ATTENTE"){
          this.vol.etatVol = "PREPARATION";
        } else if (this.vol.etatVol == "PREPARATION"){
          this.vol.etatVol = "EMBARQUEMENT";
        } else if (this.vol.etatVol == "EMBARQUEMENT"){
          this.vol.etatVol = "VOL";
          console.log(this.vol);
          this.vol.avion.enVol = true;
          console.log(this.vol);
          this.srvAvion.update(this.vol.avion);
        }
        this.srvVol.update(this.vol);
      }
    } else {
      this.vol.etatVol = "INCIDENT";
      this.srvVol.update(this.vol);
      this.vol.avion.enVol = false;
      this.srvAvion.update(this.vol.avion);
      this.router.navigate([ '/cloture' ]);
    }
  }
}
