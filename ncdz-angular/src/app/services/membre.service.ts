import { Injectable } from '@angular/core';
import { AppConfigService } from '../app-config.service';
import { HttpClient } from '@angular/common/http';
import { Membre } from '../model/membre';

@Injectable({
  providedIn: 'root'
})
export class MembreService {

  private apiUrl: string = `${this.appConfig.url}/membre`;
  public membres: Array<Membre> = [];

  constructor(private appConfig: AppConfigService, private http: HttpClient) { }

  public reload() {
    this.http.get<Array<Membre>>(this.apiUrl, this.appConfig.httpOptions)
      .subscribe(resp => this.membres = resp);
  }

  public add(membre: Membre) {
    this.http.post<Membre>(this.apiUrl, membre, this.appConfig.httpOptions)
      .subscribe(resp => this.membres.push(membre));
  }

  public update(membre: Membre) {
    this.http.put<Membre>(`${this.apiUrl}/${membre.numeroLicence}`, membre, this.appConfig.httpOptions)
      .subscribe();
  }

  public delete(membre: Membre) {
    this.http.delete<Boolean>(`${this.apiUrl}/${membre.numeroLicence}`, this.appConfig.httpOptions)
      .subscribe(resp => {
        if (resp) {
          this.membres.splice(this.membres.indexOf(membre), 1);
        }
      });
  }
}
