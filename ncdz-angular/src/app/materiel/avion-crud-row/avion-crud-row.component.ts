import { Component, OnInit, HostListener, Input } from '@angular/core';
import { Avion } from 'src/app/model/avion';
import { AvionService } from 'src/app/services/avion.service';

@Component({
  selector: 'avion-crud-row, [avion-crud-row]',
  templateUrl: './avion-crud-row.component.html',
  styleUrls: ['./avion-crud-row.component.css']
})
export class AvionCrudRowComponent implements OnInit {
  @Input('avion-crud-row') public avion: Avion;
  public oldAvion: Avion;

  public isNew: boolean = false;
  public isEditing: boolean = false;
  public isDeleting: boolean = false;

  constructor(public srvAvion: AvionService) { }

  public ngOnInit() {
    if (!this.avion) {
      this.avion = new Avion();
      this.isNew = true;
    }
  }

  @HostListener('dblclick')
  public onDblClick() {
    if (!this.isEditing) {
      this.oldAvion = JSON.parse(JSON.stringify(this.avion));
      this.isEditing = true;
    }
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(e) {
    if (e.keyCode == 13) {this.edit();}
  }

  public edit() {
    this.isEditing = false;

    if (this.isNew) {
      this.srvAvion.add(this.avion);
      this.avion = new Avion();
    }

    else {this.srvAvion.update(this.avion);}
  }

  public cancel() {
    if (this.oldAvion) {
      let index = this.srvAvion.avions.indexOf(this.avion);
      this.avion = JSON.parse(JSON.stringify(this.oldAvion));
      this.srvAvion.avions.splice(index, 1, this.avion);
    }

    this.isEditing = false;
    this.isDeleting = false;
  }

  public askDelete() {
    this.isDeleting = true;
  }

  public delete() {
    this.srvAvion.delete(this.avion);
  }
}