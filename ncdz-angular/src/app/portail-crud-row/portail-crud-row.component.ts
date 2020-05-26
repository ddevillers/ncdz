import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Membre } from '../model/membre';
import { PortailComponent } from '../portail/portail.component';
import { Saut } from '../model/saut';

@Component({
  selector: 'app-portail-crud-row',
  templateUrl: './portail-crud-row.component.html',
  styleUrls: ['./portail-crud-row.component.css']
})
export class PortailCrudRowComponent implements OnInit {

  @Input('portail-crud-row') private saut: Saut;

  private isNew: boolean = false;
  private isEditing: boolean = false;



  constructor(private portail: PortailComponent) {portail.testsauts = [new Saut()]; }

  ngOnInit(): void {
  }


  @HostListener('dblclick')
  public onDblClick() {
    if (!this.isEditing) {
      this.isEditing = true;
    }
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(e) {
    if (e.keyCode == 13) {
      this.edit();
    }
  }

  public edit() {
    this.isEditing = false;

    // if (this.isNew) {
    //   this.srvSaut.add(this.saut);
    //   this.saut = new Saut();
    // }

    // else {
    //   this.srvSaut.update(this.saut);
    // }
  }

}
