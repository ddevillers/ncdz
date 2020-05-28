import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parachutisteValide'
})
export class ParachutisteValidePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value == true){
      return "#8ecf7e";
    }
  }

}
