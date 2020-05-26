import { Component, OnInit } from '@angular/core';
import { Membre } from '../model/membre';
import { MembreService } from '../services/membre.service';
import { VolService } from '../services/vol.service';
import { FileAttenteService } from '../services/file-attente.service';
import { ParachuteService } from '../services/parachute.service';
import { FileAttente } from '../model/file-attente';

@Component({
  selector: 'app-portail',
  templateUrl: './portail.component.html',
  styleUrls: ['./portail.component.css']
})
export class PortailComponent implements OnInit {

  isEditing = false;
  oldFileAttente = null;
  oldMembre = null;

  public membre: Membre = new Membre();
  public fileAttente: FileAttente = new FileAttente();

  filterMembre: string;

  constructor(
    public srvMembre: MembreService,
    public srvVol: VolService,
    public srvParachute: ParachuteService,
    public srvFileAttente: FileAttenteService
  ) {}

  ngOnInit(): void {
    this.srvMembre.reload();
    this.srvVol.reload();
    this.srvParachute.reload();
    this.srvFileAttente.reload();
  }

  public membresFiltered() {
    if (this.filterMembre || this.filterMembre === null) {
     return this.srvMembre.membres.filter(m =>
      m.prenom.toUpperCase() == this.filterMembre.toUpperCase() || m.nom.toUpperCase() == this.filterMembre.toUpperCase()
      );
    }
    return this.srvMembre.membres;
  }

  public ajouterFileAttente() {
    this.srvFileAttente.add(this.fileAttente);
  }

  public supprimerFileAttente(fileAttente) {
    this.srvFileAttente.delete(fileAttente);
  }

  public modifierFileAttente() {
    this.srvFileAttente.update(this.fileAttente);
  }

  public ajouterSauteur() {
    this.srvMembre.update(this.membre);
    this.fileAttente.sauteurs.push(this.membre);
    this.modifierFileAttente();
  }

  public editerSauteur(membre) {

  }

  supprimerSauteur(membre) {

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
