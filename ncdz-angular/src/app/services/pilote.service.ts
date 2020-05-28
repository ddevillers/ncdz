import { Injectable } from '@angular/core';
import { Pilote } from '../model/pilote';
import { AppConfigService } from '../app-config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PiloteService {

  private apiUrl: string = `${this.appConfig.url}/pilote`;
  public pilotes: Array<Pilote> = [];

  constructor(private appConfig: AppConfigService, private http: HttpClient) { }

  public reload() {
    this.http.get<Array<Pilote>>(this.apiUrl, this.appConfig.httpOptions)
      .subscribe(resp => this.pilotes = resp);
  }

  public add(pilote: Pilote) {
    this.http.post<Pilote>(this.apiUrl, pilote, this.appConfig.httpOptions)
      .subscribe(resp => this.pilotes.push(pilote));
  }

  public update(pilote: Pilote) {
    this.http.put<Pilote>(`${this.apiUrl}/${pilote.numeroLicence}`, pilote, this.appConfig.httpOptions)
      .subscribe();
  }

  public delete(pilote: Pilote) {
    this.http.delete<Boolean>(`${this.apiUrl}/${pilote.numeroLicence}`, this.appConfig.httpOptions)
      .subscribe(resp => {
        if (resp) {
          this.pilotes.splice(this.pilotes.indexOf(pilote), 1);
        }
      });
  }
}
