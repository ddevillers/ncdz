import { Component, OnInit } from '@angular/core';
import { MembreService } from '../services/membre.service';
import { Membre } from '../model/membre';
import { Pilote } from '../model/pilote';
import { PiloteService } from '../services/pilote.service';

@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  styleUrls: ['./membre.component.css']
})
export class MembreComponent implements OnInit {

  isEditingMembre = false;
  isEditingPilote = false;
  oldMembre = null;
  oldPilote = null

  public membre: Membre = new Membre();
  public pilote: Pilote = new Pilote();

  constructor(public srvMembre: MembreService, public srvPilote: PiloteService) { }

  ngOnInit() {
  this.srvMembre.reload();
  this.srvPilote.reload();
  }

  //////Membre//////

  public ajouterMembre() {
    this.srvMembre.add(this.membre);
    this.membre = new Membre();
  }

  public editerMembre(membre: Membre) {
    this.isEditingMembre = true;
    this.membre = membre;
    this.oldMembre = new Membre(membre.nom,membre.prenom,membre.numeroLicence,membre.dateLicence,membre.niveau);
  }

  public modifierMembre() {
    this.isEditingMembre = false;
    this.srvMembre.update(this.membre);
    this.membre = new Membre();
  }

  public annulerMembre() {
    this.srvMembre.membres.splice(this.srvMembre.membres.indexOf(this.membre), 1, this.oldMembre);
    this.oldMembre = new Membre();
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
    this.oldPilote = new Pilote(pilote.nom,pilote.prenom,pilote.numeroLicence,pilote.avions);
  }

  public modifierPilote() {
    this.isEditingPilote = false;
    this.srvPilote.update(this.pilote);
    this.pilote = new Pilote();
  }

  public annulerPilote() {
    this.srvPilote.pilotes.splice(this.srvPilote.pilotes.indexOf(this.pilote), 1, this.oldPilote);
    this.oldPilote = new Pilote();
  }

  public supprimerPilote(pilote: Pilote) {
    this.srvPilote.delete(pilote);
  }
}
