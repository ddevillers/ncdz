import { Component, OnInit } from '@angular/core';
import { VolService } from '../services/vol.service';
import { MembreService } from '../services/membre.service';
import { Membre } from '../model/membre';
import { ParachuteService } from '../services/parachute.service';
import { Parachute } from '../model/parachute';
import { Vol } from '../model/vol';
import { SautService } from '../services/saut.service';
import { Saut } from '../model/saut';

@Component({
  selector: 'app-cloture',
  templateUrl: './cloture.component.html',
  styleUrls: ['./cloture.component.css']
})
export class ClotureComponent implements OnInit {

  public membre: Membre=new Membre();
  public parachute: Parachute=new Parachute();
  isOutZone=false;
  secHaveBeenUsed: boolean= false;
  jumped= false;


    constructor(public srvVol: VolService,
                public srvMembre: MembreService,
                public srvParachute: ParachuteService,
                public srvSaut: SautService) {

      }

    ngOnInit(): void {
      //this.srvVol.loadById();
      this.srvMembre.reload();
      this.srvParachute.reload();
    }


    public cloturerVolSauteur(sauteur: Membre, parachute) {
      if (parachute.centre == false){
        this.membre = sauteur;
      }
      if (this.membre = null){
        this.membre = sauteur;
      }
      this.srvParachute.pliage(this.membre.numeroLicence, sauteur.numeroParachute, this.secHaveBeenUsed);
      this.srvParachute.parachute=new Parachute();
      parachute.dispo = true;
      this.secHaveBeenUsed = false;
    }


    public cloturerIncident() {
      this.srvVol.vol.avion.etat=false;

    }

    public findParachute(numeroParachute) {
      this.srvParachute.loadById(numeroParachute);
    }


    public checkbox(){
      if (this.secHaveBeenUsed == true){
        this.secHaveBeenUsed = false;
      } else {
        this.secHaveBeenUsed = true;
      }


    }

    public beerLine(saut: Saut, sauteur: Membre) {
      this.srvSaut.addBeerLine(saut, sauteur);
    }

    public clotureVol(){
      this.srvVol.clotureVol(this.srvVol.volTermine);
    }


}
