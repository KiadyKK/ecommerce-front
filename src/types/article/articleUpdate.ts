import conditionnement from "../conditionnement/conditionnement";
import uniteVente from "../uniteVente/uniteVente";

export default interface articleUpdate {
  refArt: string;
  desArt: string;
  dg: number;
  puHT: number;
  md: number;
  mg: number;
  conditionnement: conditionnement;
  uniteVente: uniteVente;
}
