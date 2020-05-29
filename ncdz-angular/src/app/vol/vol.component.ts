import { Component, OnInit, HostListener } from '@angular/core';
import { VolService } from '../services/vol.service';
import { AvionService } from '../services/avion.service';
import { Avion } from '../model/avion';
import { PiloteService } from '../services/pilote.service';
import { Pilote } from '../model/pilote';
import { MembreService } from '../services/membre.service';
import { Membre } from '../model/membre';
import { Vol } from '../model/vol';
import { Router } from '@angular/router';
import { FileAttenteService } from '../services/file-attente.service';
import { FileAttente } from '../model/file-attente';
import { Saut } from '../model/saut';
import { SautService } from '../services/saut.service';

@Component({
  selector: 'app-vol',
  templateUrl: './vol.component.html',
  styleUrls: ['./vol.component.css']
})
export class VolComponent implements OnInit {

  private numAvion: number = 0;
  public avion: Avion;
  public pageVol: string = "menu";
  public first: boolean = true;
  public popup: boolean = false;
  public firstLoad: boolean = true;
  public popupMembre: string = "";
  public pilotes: Array<Pilote> = [];
  public managerVol: Array<Membre> = [];
  public managerSol: Array<Membre> = [];
  public vols: Array<Vol> = [];
  public vol: Vol = new Vol();
  public nbrePara: number = 0;
  public fileAttente: Array<FileAttente> = [];
  public sauts: Array<Saut> = [];
  public error: boolean = false;
  public showButton: boolean = false;

  constructor(private router: Router,
    public srvVol: VolService,
    public srvAvion: AvionService,
    public srvPilote: PiloteService,
    public srvMembre: MembreService,
    public srvFile: FileAttenteService,
    public srvSaut: SautService) {}

  ngOnInit(): void {
    this.srvPilote.reload();
    this.srvMembre.reload();
    this.srvVol.reload();
    this.srvAvion.reloadAvionDispo();
    this.srvFile.reload();
  }
  
  @HostListener('click', ['$event']) onClick(e) {
    if (this.pageVol == "saut"){
      if (e.target.id.includes("H")){
        this.vol.hauteurSautMax = e.target.id;
      }
    }
  }

  public volsFiltered(){
    this.srvVol.vols.forEach(v => {
      if (v.etatVol != 'TERMINE' && v.etatVol != 'INCIDENT'){
        this.vols.push(v);
      }
    });
  }

  public pilotesFiltered() {
    this.srvPilote.pilotes.forEach(p => {
      p.avions.forEach(a => {
        if (a.id == this.avion.id){
          this.pilotes.push(p);
        }
      });
    });
  }

  public changeAvion(n){
    this.first = false;
    this.numAvion += n;
    if (this.numAvion < 0){
      this.numAvion = this.srvAvion.avions.length - 1;
    }
    if (this.numAvion > this.srvAvion.avions.length - 1){
      this.numAvion = 0;
    }
    this.avion = this.srvAvion.avions[this.numAvion];
    document.getElementById("nomAvion").innerHTML = "[ " + String(this.avion.nom).toLocaleUpperCase() + " ]";
    if (this.avion.etat){
      document.getElementById("avionLogo").style.setProperty("-webkit-filter", "drop-shadow(0 0 0.2rem #00b000)");
    } else {
      document.getElementById("avionLogo").style.setProperty("-webkit-filter", "drop-shadow(0 0 0.2rem #b00000)");
    }
  }

  public changePage(page){
    this.pageVol = page;
    this.avion = this.srvAvion.avions[this.numAvion];

    if (page == "avions"){
      // this.srvVol.getVolByAvion(this.avion.id);
    }
    if (page == "volTerminating"){
      this.volsFiltered();
    }
  }

  public modif(membre){
    var n = 0;
    this.popupMembre = membre;
    if (membre == "pilote"){
      this.pilotes = [];
      this.pilotesFiltered();
      this.popup = true;
    } else if (membre == "managerVol"){
      if (this.fileAttente.length == 0){
        alert("Veuillez sélectionner un ou plusieurs saut(s) !");
      } else {
        this.managerVol = [];
        this.fileAttente.forEach(saut => {
          saut.sauteurs.forEach(sauteur => {
            this.managerVol.push(sauteur);
          });
        });
        this.popup = true;
      }
    } else {
      if (this.fileAttente.length == 0){
        alert("Veuillez sélectionner un ou plusieurs saut(s) !");
      } else {
        this.managerSol = [];
        this.srvMembre.membres.forEach(membres => {
          this.fileAttente.forEach(saut => {
            saut.sauteurs.forEach(sauteur => {
              if (membres.numeroLicence != sauteur.numeroLicence) {
                n++;
                if (n == this.count()){
                  this.managerSol.push(membres);
                }
              }
            });
          });
          n = 0;
        });
        this.popup = true;
      }
    }
  }

  public count(){
    var n = 0;
    this.fileAttente.forEach(f => {
      n += f.sauteurs.length;
    })
    return n;
  }

  public hide(event){
    if (event.srcElement.id == "popup"){
      this.popup = false;
    }
  }

  public hideChange(){
    this.popup = false;
  }

  public return(){
    if (this.pageVol == "avions" || this.pageVol == "volTerminating"){
      this.vol = new Vol();
      this.vols = [];
      this.ngOnInit();
      this.pageVol = 'menu';
    } else if (this.pageVol == "saut"){
      this.pageVol = 'avions';
      this.vol = new Vol();
      this.numAvion = 0;
      this.first = true;
      this.firstLoad = true;
      this.nbrePara = 0;
      this.fileAttente = [];
    }
  }

  public selectedVol(vol){
    this.showButton = true;
    this.vol = vol;
  }

  public changeEtatVol(etat){
    if (etat){
      if (this.vol.etatVol == "VOL"){
        this.vol.etatVol = "TERMINE";
        this.srvVol.update(this.vol);
        this.vol.avion.enVol = false;
        this.srvAvion.update(this.vol.avion);
        this.router.navigate([ '/cloture' ]);
      } else {
        if (this.vol.etatVol == "ATTENTE"){
          this.vol.etatVol = "PREPARATION";
        } else if (this.vol.etatVol == "PREPARATION"){
          this.vol.etatVol = "EMBARQUEMENT";
        } else if (this.vol.etatVol == "EMBARQUEMENT"){
          this.vol.etatVol = "VOL";
          this.vol.avion.enVol = true;
          this.srvAvion.update(this.vol.avion);
        }
        this.srvVol.update(this.vol);
      }
    } else {
      this.vol.etatVol = "INCIDENT";
      this.srvVol.update(this.vol);
      this.vol.avion.enVol = false;
      this.srvAvion.update(this.vol.avion);
      this.router.navigate([ '/cloture' ]);
    }
  }

  public addSaut(file){
    var del = false;
    this.fileAttente.forEach(f => {
      if (f == file){
        del = true;
      }
    });

    if (del){
      var i = 0;
      var ok = false;
      this.fileAttente.forEach(f => {
        if (f != file && ok == false){
          i++;
        } else {
          ok = true;
        }
      });
      this.fileAttente.splice(i, 1);
      this.nbrePara -= file.sauteurs.length;
      this.colorTable(file, false);
    } else {
      if ((this.nbrePara + file.sauteurs.length) > this.avion.capacite){
        this.error = true;
        setTimeout(()=>{
          this.error = false;
        }, 2000);
      } else {
        this.fileAttente.push(file);
        this.nbrePara += file.sauteurs.length;
        this.colorTable(file, true);
      }
    }

    if (this.fileAttente.length == 0){
      this.vol.respoVol = null;
      this.vol.respoSol = null;
    }
  }

  public colorTable(file, test){
    var elmt = document.getElementById("file" + file.id);
    if (test){
      elmt.style.background = "#1b6dc1";
      elmt.style.color = "white";
    } else {
      elmt.style.background = "none";
      elmt.style.color = "black";
    }
  }

  public valider(){
    this.vol.avion = this.avion;
    this.vol.etatVol = "ATTENTE";
    this.vol.sauts = new Array<Saut>();
    this.fileAttente.forEach(f => {
      let saut = new Saut(null, f.hauteurSouhaitee, f.sauteurs, f.typeSaut);
      this.vol.sauts.push(saut);
      this.srvFile.delete(f);
    });
    this.avion.enVol = true;
    this.srvAvion.update(this.avion);
    this.srvVol.add(this.vol);
    // window.location.reload();
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/nav']);
    }); 
  }
}
