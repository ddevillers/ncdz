import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../model/utilisateur';
import { UtilisateurService } from '../services/utilisateur.service';
import { AppConfigService } from '../app-config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  utilisateur = new Utilisateur();

  constructor(private srvUtilisateur: UtilisateurService, private appConfig: AppConfigService, private router: Router) { }

  ngOnInit(): void {
  }

  public seConnecter() {
    this.srvUtilisateur.connexion(this.utilisateur);
    this.utilisateur = new Utilisateur();
  }

  public sauter() {
    this.router.navigate(['/portail'])
  }


}
