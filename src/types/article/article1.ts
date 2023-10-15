import categorie from "../categorie/categorie";
import conditionnement from "../conditionnement/conditionnement";
import uniteVente from "../uniteVente/uniteVente";

export default interface article1 {
  refArt?: string;
  desArt: string;
  imgArt: string;
  urlArt: string;
  puHT: number;
  dg: number;
  md: number;
  mg: number;
  dateArt: Date;
  categorie: categorie;
  conditionnement: conditionnement;
  uniteVente: uniteVente;
}
