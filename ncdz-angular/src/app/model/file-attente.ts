import { Membre } from './membre';

export class FileAttente {
    constructor(
        public id?: number,
        public hauteurSouhaitee?: string,
        public sauteurs?: Array<Membre>
    ) { }
}
