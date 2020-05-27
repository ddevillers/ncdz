import { Component, OnInit } from '@angular/core';
import { VolService } from '../services/vol.service';

@Component({
  selector: 'app-cloture',
  templateUrl: './cloture.component.html',
  styleUrls: ['./cloture.component.css']
})
export class ClotureComponent implements OnInit {

  constructor(public srvVol: VolService) { }

  ngOnInit(): void {
    this.srvVol.loadById();
  }

}
