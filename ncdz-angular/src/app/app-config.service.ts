import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  public url: string = "http://localhost:8181/api";
  public httpOptions: Object = null;

  constructor() {
    let myHeaders: HttpHeaders = new HttpHeaders();
    myHeaders = myHeaders.append('Authorization', 'Basic ' + btoa('jordan:ajc'));
    this.httpOptions = { headers: myHeaders };
  }

  public setHeaders(login, password) {
    let myHeaders: HttpHeaders = new HttpHeaders();
    myHeaders = myHeaders.append('Authorization', 'Basic ' + btoa(login + ':' + password));
    this.httpOptions = { headers: myHeaders};
   }
}
