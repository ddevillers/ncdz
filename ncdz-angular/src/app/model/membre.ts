import { Parachute } from './parachute';

export class Membre {

    constructor(
        public nom?: string,
        public prenom?: string,
        public numeroLicence?: number,
        public dateLicence?: Date,
        public niveau?: string,
        public hauteurSouhaitee?: number,
        public numeroParachute?: number,
        public beerLine?:boolean,
        public voileSecUsed?:boolean
        ) { }
}
