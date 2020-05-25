export class Membre {

    constructor(
        public id: number, 
        public nom?: string, 
        public prenom?: string, 
        public numeroLicence?: number, 
        public dateLicence?: Date, 
        public niveau?: string
        ) { }
}
