import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from "../app-config.service";
import { Vol } from "../model/vol";

@Injectable({
  providedIn: 'root'
})
export class VolService {

  private apiUrl: string = "";
  public vols: Array<Vol> = null;
  public nbSaut: number = null;
  public nbSauts: Array<number> = [];

  constructor(private appConfig: AppConfigService,
              private http: HttpClient) {

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
}
