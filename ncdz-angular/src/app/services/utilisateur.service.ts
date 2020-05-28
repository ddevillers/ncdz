import { Injectable } from '@angular/core';
import { Utilisateur } from '../model/utilisateur';
import { AppConfigService } from '../app-config.service';
import { HttpClient } from '@angular/common/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService implements CanActivate {

  private apiUrl: string = "";
  public utilisateurs : Array<Utilisateur> = null;
//  public utilisateur: Utilisateur = new Utilisateur();
  public current: Utilisateur = new Utilisateur();

  constructor(
            private appConfig: AppConfigService, 
            private http: HttpClient, 
            private router: Router) { 
    this.apiUrl = `${ this.appConfig.url }/utilisateur`;
  }

/*  public reload() {
    this.http.get<Array<Utilisateur>>(this.apiUrl)
        .subscribe(utilisateurs => this.utilisateurs = this.utilisateurs);
  }
*/

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.current && this.current.id) {
      return true;
    }
    this.router.navigate([ 'accueil' ]);
  }

  public connexion(utilisateur: Utilisateur) {
    this.http.post<Utilisateur>(this.apiUrl + "/login", utilisateur)
        .subscribe(respUtilisateur => {
          this.current = respUtilisateur;
          this.current.login = utilisateur.login;
          this.current.password = utilisateur.password;

          this.appConfig.setHeaders(this.current);
          this.router.navigate(['/nav']);
        },
        error => alert('Identifiants incorrects'));
  }

  public deconnexion() {
    this.appConfig.setHeaders(new Utilisateur());
    this.router.navigate(['/accueil']);
  }
}
