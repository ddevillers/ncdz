import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PortailComponent } from './portail/portail.component';
import { MembreComponent } from './membre/membre.component';
import { MaterielComponent } from './materiel/materiel.component';
import { VolComponent } from './vol/vol.component';
import { AccueilComponent } from './accueil/accueil.component';
import { HistoriqueComponent } from './historique/historique.component';
import { AvionCrudRowComponent } from './materiel/avion-crud-row/avion-crud-row.component';
import { NavComponent } from './nav/nav.component';
import { ClotureComponent } from './cloture/cloture.component';
import { ParachutisteValidePipe } from './pipe/parachutiste-valide.pipe';

const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'portail', component: PortailComponent },
  { path: 'membre', component: MembreComponent },
  { path: 'materiel', component: MaterielComponent },
  { path: 'vol', component: VolComponent },
  { path: 'nav', component: NavComponent },
  { path: 'cloture', component: ClotureComponent },
  { path: 'historique', component: HistoriqueComponent},
  { path: 'cloture', component: ClotureComponent },
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
    AvionCrudRowComponent,
    HistoriqueComponent,
    NavComponent,
    ClotureComponent,
    ParachutisteValidePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
