import { Avion } from './avion';
import { Pilote } from './pilote';
import { Saut } from './saut';
import { Membre } from './membre';

export class Vol {
    constructor(
        public id?: number,
        public avion?: Avion,
        public pilote?: Pilote,
        public sauts?: Array<Saut>,
        public etatVol?: string,
        public respoVol?: Membre,
        public respoSol?: Membre,
        public hauteurSautMax?: string,
        public dateVol?: Date
        ) {}
}
