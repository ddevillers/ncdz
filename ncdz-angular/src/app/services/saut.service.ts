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
    this.http.get<number>(`${this.apiUrl}/count/${id}`)
        .subscribe(nbPara => this.nbPara = this.nbPara);
  }

  public reload() {
    this.http.get<Array<Saut>>(this.apiUrl)
      .subscribe(sauts => this.sauts = sauts);
  }


  public addBeerLine(saut, sauteur) {
    this.http.post<Saut>(`${this.apiUrl}/add-beer-line/${ saut.id }/${ sauteur.numeroLicence }`, null)
      .subscribe();
  }
}
