import { Avion } from './avion';

export class Pilote {
    constructor(
        public nom?: string, 
        public prenom?: string, 
        public numeroLicence?: number,
        public avions?: Array<Avion>
        ) { }
}
