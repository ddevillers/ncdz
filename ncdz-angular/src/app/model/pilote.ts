import { Membre } from './membre';
import { Avion } from './avion';

export class Pilote extends Membre {

    public avions: Array<Avion>

    constructor(
        public id: number, 
        public nom?: string, 
        public prenom?: string, 
        public numeroLicence?: number,
        avions?: Array<Avion>) 
    {
        super(id, nom, prenom, numeroLicence);
        this.avions = avions;
     }
}
