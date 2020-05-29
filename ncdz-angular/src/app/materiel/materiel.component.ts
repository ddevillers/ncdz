import { Component, OnInit } from '@angular/core';
import { Avion } from '../model/avion';
import { Parachute } from '../model/parachute';
import { AvionService } from '../services/avion.service';
import { ParachuteService } from '../services/parachute.service';
import { MembreService } from '../services/membre.service';

@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.css']
})
export class MaterielComponent implements OnInit {

  public isEditingAvion = false;
  public isEditingParachute = false;
  public oldAvion = null;
  public oldParachute = null;

  public avion = new Avion();
  public parachute = new Parachute();

  public filterParachute: string = "";

  constructor(public srvAvion: AvionService, public srvParachute: ParachuteService, public srvMembre: MembreService) { }

  ngOnInit() {
    this.srvAvion.reload();
    this.srvParachute.reload();
    this.srvMembre.reload();
  }




  
  public ajouterAvion() {
    console.log(this.avion);
    this.srvAvion.add(this.avion);
    this.avion = new Avion();
  }
  
  public editerAvion(avion) {
    this.isEditingAvion = true;
    this.avion = avion;
    this.oldAvion = new Avion(avion.id, avion.nom, avion.capacite, avion.etat, avion.nbreRota);
  }
  
  public modifierAvion() {
    this.srvAvion.update(this.avion);
    this.isEditingAvion = false;
    this.avion = new Avion();
  }

  public annulerAvion() {
    this.modifierAvion();
  }

  public confirmSupprimerAvion(avion) {
    avion.isDeleting = true;
  }

  public supprimerAvion(avion) {
    this.srvAvion.delete(avion);
  }

  public annulerSupprimerAvion(avion) {
    avion.isDeleting = false;
  }






  public ajouterParachute() {
    if (this.parachute.systemeSecu != "N") {
    this.srvParachute.add(this.parachute);
    this.parachute = new Parachute();
    }
  }
  
  public editerParachute(parachute) {
    this.isEditingParachute = true;
    this.parachute = parachute;
    this.oldParachute = new Parachute(parachute.id, parachute.nomHarnais, parachute.nomVoilePrin, parachute.nomVoileSec, parachute.systemeSecu, parachute.taillevoilePrin, parachute.tailleVoileSec, parachute.datePliageVoilePrin, parachute.datePliageVoileSec, parachute.plieurVoilePrin, parachute.plieurVoileSec, parachute.centre, parachute.dispo);
  }
  
  public modifierParachute() {
    this.srvParachute.update(this.parachute);
    this.isEditingParachute = false;
    this.parachute = new Parachute();
  }

  public annulerParachute() {
    this.modifierParachute();
  }

  public supprimerParachute(parachute) {
    this.srvParachute.delete(parachute);
  }

  public parachutesFiltered() {
      let filter = this.filterParachute.toUpperCase();
      if (this.filterParachute != "") {
        if (filter == "DISPO") {
          return this.srvParachute.parachutes.filter(p => p.dispo == true);
        }
        else if (filter == "INDISPO") {
          return this.srvParachute.parachutes.filter(p => p.dispo == false);
        }
        else if (filter == "CENTRE") {
          return this.srvParachute.parachutes.filter(p => p.centre == true);
        }
        else if (filter == "PERSO") {
          return this.srvParachute.parachutes.filter(p => p.centre == false);
        }
        else {
          return this.srvParachute.parachutes.filter(p =>
          p.nomHarnais.toUpperCase().includes(filter) ||
          p.nomVoilePrin.toUpperCase().includes(filter) ||
          p.nomVoileSec.toUpperCase().includes(filter) ||
          p.systemeSecu.toUpperCase().includes(filter) ||
          p.id.toString().toUpperCase().includes(filter)
        );}
      }
    return this.srvParachute.parachutes;
  }

  detailsPliage(parachute: Parachute) {
    if (parachute.detailPliage){
      parachute.detailPliage = false;
    } else {
      parachute.detailPliage = true;
    }
  }
}
