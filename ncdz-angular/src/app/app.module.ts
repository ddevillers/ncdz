import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PortailComponent } from './portail/portail.component';
import { MembreComponent } from './membre/membre.component';
import { MaterielComponent } from './materiel/materiel.component';
import { VolComponent } from './vol/vol.component';
import { AccueilComponent } from './accueil/accueil.component';
import { PortailCrudRowComponent } from './portail-crud-row/portail-crud-row.component';

const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'portail', component: PortailComponent },
  { path: 'membre', component: MembreComponent },
  { path: 'materiel', component: MaterielComponent },
  { path: 'vol', component: VolComponent },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: '**', component: AccueilComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PortailComponent,
    MembreComponent,
    MaterielComponent,
    VolComponent,
    AccueilComponent,
    PortailCrudRowComponent
  ],
  imports: [
    BrowserModule, 
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
