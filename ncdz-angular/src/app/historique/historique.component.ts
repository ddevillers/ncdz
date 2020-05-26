import { Component, OnInit } from '@angular/core';
import { VolService } from "../services/vol.service";
import { Vol } from "../model/vol";

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {

  public idAffichage: number;
  public affichage: string;

  constructor(public srvVol: VolService) { }

  ngOnInit(): void {
    this.srvVol.reload();
  }

  public affichageDetails(vol: Vol){
    if (this.idAffichage == vol.id && this.affichage == "Y"){
      this.affichage = "N";
    } else {
      this.idAffichage = vol.id;
      this.affichage = "Y";
    }
  }

}
