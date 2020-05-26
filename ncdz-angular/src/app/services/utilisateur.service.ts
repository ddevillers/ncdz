import { Injectable } from '@angular/core';
import { Utilisateur } from '../model/utilisateur';
import { AppConfigService } from '../app-config.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private apiUrl: string = "";
  public utilisateurs : Array<Utilisateur> = null;
  public utilisateur: Utilisateur = new Utilisateur();

  constructor(private appConfig: AppConfigService, private http: HttpClient, private router: Router) { 
    this.apiUrl = `${ this.appConfig.url }/utilisateurs`;
  }

  public reload() {
    this.http.get<Array<Utilisateur>>(this.apiUrl)
        .subscribe(utilisateurs => this.utilisateurs = this.utilisateurs);
  }

  public connexion(utilisateur) {
    this.http.post<Utilisateur>(this.apiUrl + "/login", utilisateur)
        .subscribe(respUtilisateur => {
          this.utilisateur = respUtilisateur;
          this.router.navigate(['/vol']);
        });
  }
}
