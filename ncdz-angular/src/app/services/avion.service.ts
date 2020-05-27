import { Injectable } from '@angular/core';
import { Avion } from '../model/avion';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../app-config.service';

@Injectable({
  providedIn: 'root'
})
export class AvionService {

  private apiUrl: string = "";
  public avions: Array<Avion> = [];
  public avionsDispo: Array<Avion> = [];

  constructor(private appConfig: AppConfigService, private http: HttpClient) {
    this.apiUrl = `${ this.appConfig.url }/avion`;
  }

  public reload() {
    this.http.get<Array<Avion>>(this.apiUrl, this.appConfig.httpOptions)
        .subscribe(resp => this.avions = resp );
  }

  public reloadAvionDispo() {
    this.http.get<Array<Avion>>(`${ this.apiUrl }/dispo`, this.appConfig.httpOptions)
        .subscribe(resp => this.avionsDispo = resp );
  }

  public add(avion) {
    this.http.post<Avion>(this.apiUrl, avion, this.appConfig.httpOptions)
        .subscribe(resp => this.avions.push(resp));
  }

  public update(avion) {
    this.http.put<Avion>(`${ this.apiUrl }/${ avion.id }`, avion, this.appConfig.httpOptions)
        .subscribe();
  }

  public delete(avion) {
    this.http.delete<Boolean>(`${ this.apiUrl }/${ avion.id }`, this.appConfig.httpOptions)
        .subscribe(resp => {
            if (resp) {
              let index = this.avions.indexOf(avion);
              this.avions.splice(index, 1);
            }
          });
  }
}
