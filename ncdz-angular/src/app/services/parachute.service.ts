import { Injectable } from '@angular/core';
import { AppConfigService } from '../app-config.service';
import { Parachute } from '../model/parachute';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParachuteService {

  private apiUrl: string = "";
  public parachutes: Array<Parachute> = [];
  public parachute = new Parachute();

  constructor(private appConfig: AppConfigService, private http: HttpClient) {
    this.apiUrl = `${ this.appConfig.url }/parachute`;
  }

  public reload() {
    this.http.get<Array<Parachute>>(this.apiUrl, this.appConfig.httpOptions)
        .subscribe(resp => this.parachutes = resp );
  }

  public loadById(id: number) {
    this.http.get<Parachute>(`${ this.apiUrl }/${ id }`, this.appConfig.httpOptions)
      .subscribe(resp => this.parachute = resp);
      
  }

  public add(parachute) {
    this.http.post<Parachute>(this.apiUrl, parachute, this.appConfig.httpOptions)
        .subscribe(resp => this.parachutes.push(resp));
  }

  public update(parachute) {
    this.http.put<Parachute>(`${ this.apiUrl }/${ parachute.id }`, parachute, this.appConfig.httpOptions)
        .subscribe();
  }

  public delete(parachute) {
    this.http.delete<Boolean>(`${ this.apiUrl }/${ parachute.id }`, this.appConfig.httpOptions)
        .subscribe(resp => {
            if (resp) {
              let index = this.parachutes.indexOf(parachute);
              this.parachutes.splice(index, 1);
            }
          });
  }

  public pliage(id_membre, id_parachute, secHaveBeenUsed) {
    this.http.post<Parachute>(`${ this.apiUrl }/pliage/${ id_membre }/${ id_parachute }/${ secHaveBeenUsed }`, null, this.appConfig.httpOptions)
        .subscribe();
  }

  public etatFalse(id) {
    this.http.put<Parachute>(`${ this.apiUrl }/etatFalse/${ id }`, this.appConfig.httpOptions)
    .subscribe();
  }

  public etatTrue(id) {
    this.http.put<Parachute>(`${ this.apiUrl }/etatTrue/${ id }`, this.appConfig.httpOptions)
    .subscribe();
  }
}
