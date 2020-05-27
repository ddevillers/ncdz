import { Component, OnInit } from '@angular/core';
import { VolService } from '../services/vol.service';
import { MembreService } from '../services/membre.service';
import { Membre } from '../model/membre';
import { ParachuteService } from '../services/parachute.service';
import { Parachute } from '../model/parachute';

@Component({
  selector: 'app-cloture',
  templateUrl: './cloture.component.html',
  styleUrls: ['./cloture.component.css']
})
export class ClotureComponent implements OnInit {

  membre=new Membre();
  parachute=new Parachute();

  constructor(public srvVol: VolService, public srvMembre: MembreService, public srvParachute: ParachuteService) { }

  ngOnInit(): void {
    this.srvVol.loadById();
    this.srvMembre.reload();
    this.srvParachute.reload();

    if(this.srvVol.vol.etatVol=='INCIDENT') {this.srvVol.vol.avion.etat=false;}

  }

}
