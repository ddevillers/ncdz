import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../app-config.service';

@Injectable({
  providedIn: 'root'
})
export class SautService {

  private apiUrl: string = "";
  public nbPara: number = null;

  constructor(private appConfig: AppConfigService,
    private http: HttpClient) {
      this.apiUrl = `${ this.appConfig.url }/saut`;
    }

  public reloadCount(id){
    this.http.get<number>(`${this.apiUrl}/count/${id}`)
        .subscribe(nbPara => this.nbPara = this.nbPara);
  }
}
