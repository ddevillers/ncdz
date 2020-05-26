import { Component, OnInit } from '@angular/core';
import { Membre } from '../model/membre';
import { Vol } from '../model/vol';
import { Avion } from '../model/avion';
import { Pilote } from '../model/pilote';
import { Saut } from '../model/saut';
import { Parachute } from '../model/parachute';
import { MembreService } from '../services/membre.service';
import { VolService } from '../services/vol.service';

@Component({
  selector: 'app-portail',
  templateUrl: './portail.component.html',
  styleUrls: ['./portail.component.css']
})
export class PortailComponent implements OnInit {

  public membre1 = new Membre("Abid", "Jordan");
  public membre2 = new Membre("Gg", "Jerem");
  public membres1 = [this.membre1,this.membre2];
  public sauteurs1 = [this.membre1];
  public parachute1 = new Parachute(1234);
  public parachute2 = new Parachute(5678);
  public parachutes = [this.parachute1,this.parachute2];
  public avion1 = new Avion(1,"LeCoucou",10,true,2);
  public pilote1 = new Pilote("Pedro","Fernandez");
  public saut1 = new Saut(1,4000,this.sauteurs1,"solo");
  public sauts = [this.saut1];
  public vol1 = new Vol(1,this.avion1,this.pilote1,this.sauts,"attente",this.membre1,this.membre2,4000);
  public vol2 = new Vol(2,this.avion1,this.pilote1,this.sauts,"attente",this.membre2,this.membre1,6000);
  public vols = [this.vol1,this.vol2];

//fin test

  isEditing = false;
  oldMembre = null;

  public membre: Membre = 
  new Membre();
  public reservation: Array<Membre> = [];

  public nbPers: number = 1;
  filterMembre: string;

  constructor(
    public srvMembre: MembreService,
    public srvVol: VolService
  ) {}

  ngOnInit(): void {
    this.srvMembre.reload();
    this.srvVol.reload();
  }


  // counterRes(i: number) {
  //   this.reservation = [];
  //   for (var a = 0; a < i; a++) {
  //     this.reservation.push(new Membre());
  //   }
  //   return this.reservation = new Array<Membre>(i);
  // }

  validNbPers() {
    this.reservation = [];
    for (var a = 0; a < this.nbPers; a++) {
      this.reservation.push(new Membre());
    }
  }

  public membresFiltered() {
    if (this.filterMembre || this.filterMembre === null) {
     return this.srvMembre.membres.filter(m =>
      m.prenom.toUpperCase() == this.filterMembre.toUpperCase() || m.nom.toUpperCase() == this.filterMembre.toUpperCase()
      );
    }
    return this.srvMembre.membres;
  }

  public ajouterMembre() {
    this.reservation.push(this.membre);
    this.membre = new Membre();
  }

  public supprimerMembre(membre) {
    this.reservation.push(membre);
  }

  public editerMembre(membre) {
    this.isEditing = true;
    this.membre = membre;
    this.membre = this.srvMembre.membres.find(m => m.numeroLicence == this.membre.numeroLicence);
    
    this.oldMembre = membre;
  }

  public modifierMembre() {
    this.srvMembre.update(this.membre);
    this.isEditing = false;
    this.membre = new Membre();
  }

  public annulerMembre() {
    this.modifierMembre();
  }

}
