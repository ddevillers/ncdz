import { Membre } from './membre';

export class Saut {
    constructor(
        public id?: number,
        public hauteurSaut?: string,
        public sauteurs?: Array<Membre>,
        public typeSaut?: string,
        public beerLine?: Array<Membre>
        ) {}
}
