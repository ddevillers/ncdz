import { Component, OnInit } from '@angular/core';
import { Avion } from '../model/avion';
import { Parachute } from '../model/parachute';
import { AvionService } from '../services/avion.service';
import { ParachuteService } from '../services/parachute.service';

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
  public filterParachute: String;

  constructor(public srvAvion: AvionService, private srvParachute: ParachuteService) { }

  ngOnInit() {
    this.srvAvion.reload();
    this.srvParachute.reload();
    console.log(this.srvParachute.parachutes);
  }

  public ajouterAvion() {
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

  public supprimerAvion(avion) {
    this.srvAvion.delete(avion);
  }

  public ajouterParachute() {
    this.srvParachute.add(this.parachute);
    this.parachute = new Parachute();
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

}
