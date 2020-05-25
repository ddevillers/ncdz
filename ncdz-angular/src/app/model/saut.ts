import { Membre } from './membre';

export class Saut {
    constructor(
        public id?: number,
        public hauteur?: number,
        public sauteurs?: Array<Membre>,
        public typeSaut?: string,
        public beerLine?: Array<Membre>
        ) {}
}
