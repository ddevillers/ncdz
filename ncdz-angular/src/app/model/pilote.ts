import { Avion } from './avion';

export class Pilote {

    public avions: Array<Avion> = [];

    constructor(
        public nom?: string, 
        public prenom?: string, 
        public numeroLicence?: number,
        avions?: Array<Avion>
        ) { }
}
