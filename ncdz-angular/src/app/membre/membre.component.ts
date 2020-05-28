import { Component, OnInit } from '@angular/core';
import { MembreService } from '../services/membre.service';
import { Membre } from '../model/membre';
import { Pilote } from '../model/pilote';
import { PiloteService } from '../services/pilote.service';
import { Avion } from '../model/avion';
import { AvionService } from '../services/avion.service';

@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  styleUrls: ['./membre.component.css']
})
export class MembreComponent implements OnInit {

  isEditingMembre = false;
  isEditingPilote = false;
  oldMembre = null;
  oldPilote = null;

  public membre: Membre = new Membre();
  public pilote: Pilote = new Pilote();
  public avion: Avion = new Avion();

  constructor(
    public srvMembre: MembreService, 
    public srvPilote: PiloteService,
    public srvAvion: AvionService
    ) { }

  ngOnInit() {
  this.srvMembre.reload();
  this.srvPilote.reload();
  this.srvAvion.reload();
  }

  //////Membre//////

  public ajouterMembre() {
    this.srvMembre.add(this.membre);
    this.membre = new Membre();
  }

  public editerMembre(membre: Membre) {
    this.isEditingMembre = true;
    this.membre = membre;
    this.oldMembre = JSON.parse(JSON.stringify(membre));
  }

  public modifierMembre() {
    this.isEditingMembre = false;
    this.srvMembre.update(this.membre);
    this.membre = new Membre();
  }

  public annulerMembre() {
    this.srvMembre.membres.splice(this.srvMembre.membres.indexOf(this.membre), 1, this.oldMembre);
    this.membre = this.oldMembre;
    this.modifierMembre();
  }

  public supprimerMembre(membre: Membre) {
    this.srvMembre.delete(membre);
  }


  //////Pilote//////

  public ajouterPilote() {
    this.srvPilote.add(this.pilote);
    this.pilote = new Pilote();
  }

  public editerPilote(pilote: Pilote) {
    this.isEditingPilote = true;
    this.pilote = pilote;
    this.oldPilote = JSON.parse(JSON.stringify(pilote));
  }

  public modifierPilote() {
    this.isEditingPilote = false;
    this.srvPilote.update(this.pilote);
    this.pilote = new Pilote();
  }

  public annulerPilote() {
    this.srvPilote.pilotes.splice(this.srvPilote.pilotes.indexOf(this.pilote), 1, this.oldPilote);
    this.pilote = this.oldPilote;
    this.modifierPilote();
  }

  public supprimerPilote(pilote: Pilote) {
    this.srvPilote.delete(pilote);
  }

  public ajouterAvion() {
    let cpt: number = 0;
    for (let avion of this.pilote.avions) {
      if (avion.id == this.avion.id) {
        cpt++;
      }
    }
    if (cpt == 0 && this.avion.id != null) {
      this.pilote.avions.push(this.avion);
    }
    this.avion = new Avion();
  }

  public supprimerAvion(avion: Avion) {
    this.pilote.avions.splice(this.pilote.avions.indexOf(avion), 1);
  }
}
