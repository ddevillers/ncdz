import { Membre } from './membre';

export class FileAttente {
    constructor(
        public id?: number,
        public hauteurSouhaitee?: string,
        public typeSaut?: string,
        public sauteurs?: Array<Membre>
    ) { }
}
