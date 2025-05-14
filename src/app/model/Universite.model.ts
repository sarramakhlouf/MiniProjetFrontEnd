import { Domaine } from "./Domaine.model";
export class Universite {
    idUni! : number;
    nomUni! : string;
    adresseUni! : string;
    dateCreation! : Date ;
    numberEtudiants! : number ;
    domaine! : Domaine ;
    email!: string;
}