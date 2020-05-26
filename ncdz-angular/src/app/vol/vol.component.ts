import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { VolService } from '../services/vol.service';

@Component({
  selector: 'app-vol',
  templateUrl: './vol.component.html',
  styleUrls: ['./vol.component.css']
})
export class VolComponent implements OnInit {

  constructor(public appComp : AppComponent, public srvVol: VolService) {}

  ngOnInit(): void {
  }
  
  public volsFiltered() {
    // if (this.filterPrix || this.filterPrix === 0) {
    //  return this.srvVisite.visites.filter(v =>
    //     v.prix == this.filterPrix || v.id == this.filterPrix
    //   );
    // }

    // return this.srvVol;
  }

}
