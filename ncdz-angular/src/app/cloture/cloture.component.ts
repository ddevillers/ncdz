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
  nbSauteurCloture:number=0;
  nbTotal:number;
  tousCloture: boolean=false;
  jumped= false;


    constructor(public srvVol: VolService,
                public srvMembre: MembreService,
                public srvParachute: ParachuteService,
                public srvSaut: SautService) {

      }

    ngOnInit(): void {
      this.srvVol.volTermine;
      // this.srvVol.loadById();
      this.srvMembre.reload();
      this.srvParachute.reload();
    }


    public cloturerVolSauteur(sauteur: Membre, parachute, saut) {
      if (parachute.centre == false){
        this.membre = sauteur;
      }
      if (this.membre == null){
        this.membre = sauteur;
      }
      if (!parachute.plieurVoilePrin){
        parachute.plieurVoilePrin = sauteur;
      }
      this.srvParachute.pliage(parachute.plieurVoilePrin.numeroLicence, sauteur.numeroParachute, this.secHaveBeenUsed);
      this.srvParachute.parachute=new Parachute();
      parachute.dispo = true;
      this.secHaveBeenUsed = false;
      if (sauteur.beerLine) {
        this.srvSaut.addBeerLine(saut, sauteur);
        sauteur.beerLine = false;
      }
      this.nbSauteurCloture=this.nbSauteurCloture+1;
      this.nbTotal=0;
      this.srvVol.volTermine.sauts.forEach(saut => {this.nbTotal=this.nbTotal+saut.sauteurs.length;
        
      });
      if (this.nbSauteurCloture==this.nbTotal) {
        this.tousCloture=true;
      }

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

    public attribuerBL(event:any, sauteur:String ) {
      console.log(sauteur);
    console.log(event);
    }

    public utilisationSec(event:any) {
      if (this.secHaveBeenUsed == true){
        this.secHaveBeenUsed = false;
      } else {
        this.secHaveBeenUsed = true;
      }

    }
    public test(sauteur) {
      console.log(sauteur.voileSecUsed)
    }





}
