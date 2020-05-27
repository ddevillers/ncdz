import { Membre } from './membre';

export class Parachute {

    constructor(public id?: number,
                public nomHarnais?: String,
                public nomVoilePrin?: String,
                public nomVoileSec?: String,
                public systemeSecu?: String,
                public tailleVoilePrin?: number,
                public tailleVoileSec?: number,
                public datePliageVoilePrin?: Date,
                public datePliageVoileSec?: Date,
                public plieurVoilePrin?: Membre,
                public plieurVoileSec?: Membre,
                public centre?: boolean,
                public dispo?: boolean,
                public detailPliage?: boolean) {

    }
}