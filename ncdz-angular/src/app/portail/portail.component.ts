import { Component, OnInit } from '@angular/core';
import { Membre } from '../model/membre';
import { MembreService } from '../services/membre.service';
import { VolService } from '../services/vol.service';
import { FileAttenteService } from '../services/file-attente.service';
import { ParachuteService } from '../services/parachute.service';
import { FileAttente } from '../model/file-attente';
import { SautService } from '../services/saut.service';
import { Router } from '@angular/router';

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

  public inscrVisible: Boolean = true;
  public volsVisible: Boolean = false;
  public sautsVisible: Boolean = false;
  public videosVisible: Boolean = false;
  public idAffichageVol: number;
  public affichageVol: Boolean = false;
  public idAffichageSaut: number;
  public affichageSaut: Boolean = false;
  public lecteurVisible: Boolean = false;

  public srcVideo: string;

  constructor(
    public srvMembre: MembreService,
    public srvVol: VolService,
    public srvParachute: ParachuteService,
    public srvSaut: SautService,
    public srvFileAttente: FileAttenteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.srvMembre.reload();
    this.srvVol.reload();
    this.srvParachute.reload();
    this.srvFileAttente.reload();
    this.srvSaut.reload();
  }

  public lienVideo() {
    return this.srcVideo;
  }

  public accueil() {
    this.router.navigate(['/accueil'])
  }

  public membresDispo() {
    return this.srvMembre.membres.filter(m => !this.fileAttente.sauteurs.includes(m));
  }

  public membresFiltered() {
    if (this.filterMembre || this.filterMembre === null) {
     return this.membresDispo().filter(m =>
      m.prenom.toUpperCase().includes(this.filterMembre.toUpperCase()) || m.nom.toUpperCase().includes(this.filterMembre.toUpperCase())
      );
    }
    return this.membresDispo();
  }

  public parachutesDispo() {
    return this.srvParachute.parachutes.filter(p => p.dispo);
  }

  public parachuteFiltered() {
    if (this.filterNumPara) {
     return this.parachutesDispo().filter(
       p => String(p.id).includes(String(this.filterNumPara))
      );
    }
    return this.parachutesDispo();
  }

  public peutAjouterSauteur() {
    let can;
    if(!this.isEditing){
      if(this.fileAttente.typeSaut=="SOLO" && this.nbPers<1) {can = true;}
      else if(this.fileAttente.typeSaut=="TANDEM" && this.nbPers<2) {can = true;}
      else if(this.fileAttente.typeSaut=="GROUPE" && this.nbPers<13) {can = true;}
      else{can=false}
    }
    return can;
  }

  public peutSauter() {
    let can;
    if(this.valider && this.fileAttente.hauteurSouhaitee && !this.isEditing){
      if(this.fileAttente.typeSaut=="SOLO" && this.nbPers<2) {can = true;}
      else if(this.fileAttente.typeSaut=="TANDEM" && this.nbPers==2) {can = true;}
      else if(this.fileAttente.typeSaut=="GROUPE" && this.nbPers<14 && this.nbPers>1) {can = true;}
      else{can=false}
    }
    return can;
  }

  public afficherIncript() {
    if (this.inscrVisible){
      this.inscrVisible = false;
    } else {
      this.inscrVisible = true;
    }
    if(!this.inscrVisible && !this.sautsVisible && !this.videosVisible)
    {this.volsVisible = true;}
  }
  
  public afficherVols() {
    if (this.volsVisible){
      this.volsVisible = false;
    } else {
      this.volsVisible = true;
    }
    if(!this.volsVisible && !this.sautsVisible && !this.videosVisible)
    {this.inscrVisible = true;}
  }
  
  public afficherSauts() {
    if (this.sautsVisible){
      this.sautsVisible = false;
    } else {
      this.sautsVisible = true;
    }
    if(!this.volsVisible && !this.sautsVisible && !this.videosVisible)
    {this.inscrVisible = true;}
  }

  public afficherVideos() {
    if (this.videosVisible){
      this.videosVisible = false;
    } else {
      this.videosVisible = true;
    }
    if(!this.volsVisible && !this.sautsVisible && !this.videosVisible)
    {this.inscrVisible = true;}
  }

  public affichageDetailsVol(vol) {
    if (this.idAffichageVol == vol.id && this.affichageVol){
      this.affichageVol = false;
    } else {
      this.idAffichageVol = vol.id;
      this.affichageVol = true;
    }
  }

  public affichageDetailsSaut(saut) {
    if (this.idAffichageSaut == saut.id && this.affichageSaut){
      this.affichageSaut = false;
    } else {
      this.idAffichageSaut = saut.id;
      this.affichageSaut = true;
    }
  }

  public affichageLecteur() {
    if (this.lecteurVisible){
      this.lecteurVisible = false;
    } else {
      this.lecteurVisible = true;
    }
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
  // public codeValue: string;

  // public saveCode(e): void {
  //   let nom = e.target.nom.value;
  //   console.log(nom);
  //   let list = this.membresFiltered().filter(x => x.nom === nom)[0];
  //   console.log(list.nom);
  // }

}
