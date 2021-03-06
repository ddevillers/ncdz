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
  public volTermine: Vol = new Vol();

  constructor(private appConfig: AppConfigService,
              private http: HttpClient,
              private router: Router) {

    this.apiUrl = `${ this.appConfig.url }/vol`;
  }

  public reload() {
    this.http.get<Array<Vol>>(this.apiUrl, this.appConfig.httpOptions)
      .subscribe(vols => this.vols = vols);
  }

  public reloadCount(id) {
    this.http.get<number>(`${this.apiUrl}/count/${id}`, this.appConfig.httpOptions)
        .subscribe(nbSaut => {this.nbSaut = nbSaut; console.log(nbSaut); this.nbSauts.push(nbSaut)});
  }

  public loadById() {
    this.http.get<Vol>(`${ this.apiUrl }/1`, this.appConfig.httpOptions)
      .subscribe(resp => {
        resp.sauts.forEach(saut => {
          saut.sauteurs.forEach(sauteur => {sauteur.voileSecUsed=false;
          
        });
          
        });
        this.volTermine = resp;

      });
  }

  public add(vol) {
    this.http.post<Vol>(this.apiUrl, vol, this.appConfig.httpOptions)
        .subscribe(resp => this.vols.push(resp));
  }


  public getVolByAvion(id){
    this.http.get<Vol>(`${this.apiUrl}/avion/${id}`, this.appConfig.httpOptions)
        .subscribe(vol => this.vol = vol);
  }

  public update(vol) {
    this.http.put<Vol>(`${this.apiUrl}/${vol.id}`, vol, this.appConfig.httpOptions)
        .subscribe(resp => {
          resp.sauts.forEach(saut => {
            saut.sauteurs.forEach(sauteur => {sauteur.voileSecUsed=false;
            });
          });
          
          this.volTermine = resp;
        });
  }

  public clotureVol(vol) {
    this.http.put<Vol>(`${ this.apiUrl }/cloture/${ vol.id }`, vol, this.appConfig.httpOptions)
      .subscribe(resp => {
        this.router.navigate(['/nav']);
      });
  }
}
