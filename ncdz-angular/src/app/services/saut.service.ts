import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../app-config.service';
import { Saut } from "../model/saut";

@Injectable({
  providedIn: 'root'
})
export class SautService {

  private apiUrl: string = "";
  public nbPara: number = null;
  public sauts: Array<Saut> = null;

  constructor(private appConfig: AppConfigService,
    private http: HttpClient) {
      this.apiUrl = `${ this.appConfig.url }/saut`;
    }

  public reloadCount(id){
    this.http.get<number>(`${this.apiUrl}/count/${id}`, this.appConfig.httpOptions)
        .subscribe(nbPara => this.nbPara = this.nbPara);
  }

  public reload() {
    this.http.get<Array<Saut>>(this.apiUrl, this.appConfig.httpOptions)
      .subscribe(sauts => this.sauts = sauts);
  }

  public add(saut) {
    return this.http.post<Saut>(this.apiUrl, saut, this.appConfig.httpOptions);
  }

  public addBeerLine(saut, sauteur) {
    this.http.post<Saut>(`${this.apiUrl}/add-beer-line/${ saut.id }/${ sauteur.numeroLicence }`, null, this.appConfig.httpOptions)
      .subscribe();
  }
}
