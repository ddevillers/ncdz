import { Injectable } from '@angular/core';
import { AppConfigService } from '../app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ParachuteService {

  constructor(private appConfig: AppConfigService) {
    
  }
}
