import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Utilisateur } from './model/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  public url: string = "http://localhost:8181/api";
  public httpOptions: Object = {};

  constructor() {
    /*let myHeaders: HttpHeaders = new HttpHeaders();
    myHeaders = myHeaders.append('Authorization', 'Basic ' + btoa('admin:admin'));
    this.httpOptions = { headers: myHeaders };*/
  }

  public setHeaders(utilisateur: Utilisateur) {
    let myHeaders: HttpHeaders = new HttpHeaders();
    myHeaders = myHeaders.append('Authorization', 'Basic ' + btoa(utilisateur.login + ':' + utilisateur.password));
    this.httpOptions = { headers: myHeaders };
   }
}
