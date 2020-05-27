import { Component, OnInit } from '@angular/core';
import { VolService } from '../services/vol.service';
import { MembreService } from '../services/membre.service';
import { Membre } from '../model/membre';
import { ParachuteService } from '../services/parachute.service';
import { Parachute } from '../model/parachute';
import { Vol } from '../model/vol';

@Component({
  selector: 'app-cloture',
  templateUrl: './cloture.component.html',
  styleUrls: ['./cloture.component.css']
})
export class ClotureComponent implements OnInit {

  public membre: Membre=new Membre();
  public parachute: Parachute=new Parachute();
  public vol: Vol= new Vol();
  isOutZone=false;
  secHaveBeenUsed= false;
  jumped= false;


  constructor(public srvVol: VolService, public srvMembre: MembreService, public srvParachute: ParachuteService) { }

  ngOnInit(): void {
    this.srvVol.loadById();
    this.srvMembre.reload();
    this.srvParachute.reload();
  }


  public cloturerVolSauteur() {
    this.srvParachute.update(this.parachute);
    this.parachute=new Parachute();



  }


  public clotureIncident() {
    this.srvVol.vol.avion.etat=false;

  }



}
