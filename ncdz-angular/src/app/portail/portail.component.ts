import { Component, OnInit } from '@angular/core';
import { Membre } from '../model/membre';
import { MembreService } from '../services/membre.service';
import { VolService } from '../services/vol.service';
import { FileAttenteService } from '../services/file-attente.service';
import { ParachuteService } from '../services/parachute.service';
import { FileAttente } from '../model/file-attente';
import { SautService } from '../services/saut.service';

@Component({
  selector: 'app-portail',
  templateUrl: './portail.component.html',
  styleUrls: ['./portail.component.css']
})
export class PortailComponent implements OnInit {
  isEditing = false;
  oldMembre = null;
  valider = false;
  nbPers = 0;
  indexMod: number;

  public membre: Membre = new Membre();
  public fileAttente: FileAttente = new FileAttente(0,"","SOLO",[]);

  filterMembre: string;
  filterNumPara: number;

  constructor(
    public srvMembre: MembreService,
    public srvVol: VolService,
    public srvParachute: ParachuteService,
    public srvSaut: SautService,
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
      m.prenom.toUpperCase().includes(this.filterMembre.toUpperCase()) || m.nom.toUpperCase().includes(this.filterMembre.toUpperCase())
      );
    }
    return this.srvMembre.membres;
  }

  public numParaFiltered() {
    if (this.filterNumPara || this.filterNumPara === null || this.filterNumPara === 0) {
     return this.srvParachute.parachutes.filter(
       p => String(p.id).includes(String(this.filterNumPara))
      );
    }
    return this.srvParachute.parachutes;
  }

  public ajouterFileAttente() {
    alert(this.fileAttente.typeSaut)
    this.srvFileAttente.add(this.fileAttente);
    this.fileAttente = new FileAttente(0,"","",[]);
    this.nbPers=0;
  }

  public ajouterSauteur() {
    this.srvMembre.update(this.membre);
    this.fileAttente.sauteurs.push(this.membre);
    this.membre = new Membre();
    this.nbPers++;
    this.valider=true;
  }

  public editerSauteur(membre) {
    this.isEditing=true;
    this.indexMod = this.fileAttente.sauteurs.indexOf(membre);
  }

  public modifierSauteur() {
    this.isEditing=false;
    this.fileAttente.sauteurs.splice(this.indexMod,1,this.membre);
  }

  supprimerSauteur(membre) {
    var index = this.fileAttente.sauteurs.indexOf(membre);
    this.fileAttente.sauteurs.splice(index,1);
    this.nbPers--;
  }

  public annulerSauteur() {

  }

  //test
  public codeValue: string;

  public saveCode(e): void {
    let nom = e.target.nom.value;
    console.log(nom);
    let list = this.membresFiltered().filter(x => x.nom === nom)[0];
    console.log(list.nom);
  }

}
