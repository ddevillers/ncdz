import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from "../app-config.service";
import { Vol } from "../model/vol";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VolService {

  private apiUrl: string = "";
  public vols: Array<Vol> = null;
  public vol: Vol = new Vol();
  public nbSaut: number = null;
  public nbSauts: Array<number> = [];

  constructor(private appConfig: AppConfigService,
              private http: HttpClient,
              private router: Router) {

    this.apiUrl = `${ this.appConfig.url }/vol`;
  }

  public reload() {
    this.http.get<Array<Vol>>(this.apiUrl)
      .subscribe(vols => this.vols = vols);
  }

  public reloadCount(id) {
    this.http.get<number>(`${this.apiUrl}/count/${id}`)
        .subscribe(nbSaut => {this.nbSaut = nbSaut; console.log(nbSaut); this.nbSauts.push(nbSaut)});
  }

  public loadById() {
    this.http.get<Vol>(`${ this.apiUrl }/1`)
      .subscribe(respVol => this.vol = respVol);
  }


  public getVolByAvion(id){
    this.http.get<Vol>(`${this.apiUrl}/avion/${id}`)
        .subscribe(vol => this.vol = vol);
  }

  public clotureVol(vol) {
    this.http.put<Vol>(`${ this.apiUrl }/cloture/${ vol.id }`, vol)
      .subscribe(resp => {
        this.router.navigate(['/nav']);
      });
  }
}
