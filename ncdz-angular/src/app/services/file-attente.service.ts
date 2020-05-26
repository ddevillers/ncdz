import { Injectable } from '@angular/core';
import { AppConfigService } from '../app-config.service';
import { HttpClient } from '@angular/common/http';
import { FileAttente } from '../model/file-attente';
import { Membre } from '../model/membre';

@Injectable({
  providedIn: 'root'
})
export class FileAttenteService {
  private apiUrl: string = `${this.appConfig.url}/fileAttente`;
  public fileAttentes: Array<FileAttente> = [];
  public sauteurs: Array<Membre> = [];

  constructor(private appConfig: AppConfigService, private http: HttpClient) { }

  public reload() {
    this.http.get<Array<FileAttente>>(this.apiUrl)
      .subscribe(resp => this.fileAttentes = resp);
  }

  public add(fileAttente: FileAttente) {
    this.http.post<FileAttente>(this.apiUrl, fileAttente)
      .subscribe(resp => this.fileAttentes.push(fileAttente));
  }

  public update(fileAttente: FileAttente) {
    this.http.put<FileAttente>(`${this.apiUrl}/${fileAttente.id}`, fileAttente)
      .subscribe();
  }

  public delete(fileAttente: FileAttente) {
    this.http.delete<Boolean>(`${this.apiUrl}/${fileAttente.id}`)
      .subscribe(resp => {
        if (resp) {
          this.fileAttentes.splice(this.fileAttentes.indexOf(fileAttente), 1);
        }
      });
  }

}
