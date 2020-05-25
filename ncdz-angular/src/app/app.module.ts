import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PortailComponent } from './portail/portail.component';
import { MembreComponent } from './membre/membre.component';
import { MaterielComponent } from './materiel/materiel.component';
import { VolComponent } from './vol/vol.component';
import { AccueilComponent } from './accueil/accueil.component';

@NgModule({
  declarations: [
    AppComponent,
    PortailComponent,
    MembreComponent,
    MaterielComponent,
    VolComponent,
    AccueilComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
